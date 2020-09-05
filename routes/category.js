const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const mongoose = require("../database/connection");
const { Category } = require("../model/category");
console.log("DB NAME", process.env.DB_NAME);
mongoose.connect(process.env.DB_NAME);

router.get("/", (req, res, next) => {
  res.send({ status: 200, message: "Welcome to category page" });
});
router.post("/add", (req, res) => {
  console.log(req.body.catgegory_name);
  const catgegory_name = req.body.category_name;
  const category_type = req.body.category_type;
  const parent_category = req.body.parent_category;
  const id = shortid.generate();
  if (!catgegory_name || !category_type || !parent_category) {
    res.send({ status: 400, message: "parameter missing" });
    return;
  }
  if (!parent_category.indexOf("$") == 0) {
    res.send({ status: 400, message: "invalid parent_category" });
    return;
  }
  Category.find({ catgegory_name }, (err, doc) => {
    if (doc.length) {
      res.send({
        status: 400,
        message: "data for this category_name already exist"
      });
      return;
    } else {
      Category.create(
        { catgegory_name, category_type, parent_category, id },
        (err, doc) => {
          if (!err) {
            res.send({ status: 200, message: "data inserted successfully" });
            console.log(doc);
          } else {
            res.send({ status: 404, message: "data insertion failed" });
          }
        }
      );
    }
  });
});

router.get("/getAllCategories", (req, res) => {
  //This api gets all categories along with their child nodes

  Category.find({}, (err, doc) => {
    if (err) {
      res.send({
        status: 404,
        message: "query failed to get all categories and child nodes"
      });
    } else {
      console.log(doc);
      if (doc.length == 0) {
        res.send({
          status: 200,
          message: "no data found in category collection"
        });
      } else {
        const finalDataArr = [];
        const topArr = [];
        const baseArr=[];
        for (var i = 0; i < doc.length; i++) {
         if(doc[i].category_type=="top"){
          topArr.push(doc[i]);
         }else{
           baseArr.push(doc[i]);
         }
        }
        for(var j=0;j<topArr.length;j++){
          var finalData = {
            id:topArr[j].id,
            category_name:topArr[j].catgegory_name,
            child_categories:[]
          }
          console.log("CATEGORY NAME",topArr[j].catgegory_name)
          for(var k=0;k<baseArr.length;k++){
            console.log(baseArr[k].parent_category,topArr[j].catgegory_name)
            if(baseArr[k].parent_category == "$"+topArr[j].catgegory_name){  
              console.log("INDISE TRUE")
              finalData.child_categories.push(baseArr[k].catgegory_name)
            }
          }
          finalDataArr.push(finalData)
        }
        res.send({
          status: 200,
          data: finalDataArr
        });
      }
    }
  });
});

module.exports = router;
