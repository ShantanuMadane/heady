const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const mongoose = require("../database/connection");
const { Product } = require("../model/products");
console.log("DB NAME", process.env.DB_NAME);
mongoose.connect(process.env.DB_NAME);

router.get("/", (req, res) => {
  res.send({ status: 200, message: "Welcome to products page" });
});

router.post("/add", (req, res) => {
  const product_name = req.body.product_name;
  if (typeof req.body.product_price != Number) {
    res.send({ status: 400, message: "invalid product_price" });
    return;
  }
  const product_price = parseInt(req.body.product_price, 10);
  const categories = req.body.categories.split(",");
  const id = shortid.generate();
  if (!product_name || !product_price || !categories) {
    res.send({ status: 400, message: "parameter missing" });
    return;
  }
  if (!product_price > 0) {
    res.send({
      status: 400,
      message: "product_price should be greater than 0"
    });
    return;
  }
  Product.create(
    { product_name, product_price, categories, id },
    (err, doc) => {
      if (!err) {
        res.send({ status: 200, message: "data inserted successfully" });
        console.log(doc);
      } else {
        res.send({ status: 404, message: "data insertion failed" });
      }
    }
  );
});
router.post("/update", (req, res) => {
  const product_name = req.body.product_name;
  const id = req.body.id_of_product_update;

  const product_price = req.body.product_price;
  console.log(typeof product_price)
  console.log(parseInt(product_price))
  if (parseInt(product_price) == NaN) {
    res.send({ status: 400, message: "invalid product_price" });
    return;
  }

  if (!id) {
    res.send({ status: 400, message: "compulsory paramter id missing" });
    return;
  }
  if (!product_name && !product_price) {
    res.send({ status: 400, message: "no data to update" });
    return;
  }
  Product.find({ id }, (err, doc) => {
    if (doc.length == 0) {
      res.send({ status: 400, message: "invalid id or no data found" });
      return;
    } else if (!err) {
      if (product_price && product_name) {
        Product.findOneAndUpdate({ id }, { $set: { product_name, product_price } },{new:true}, (err, doc) => {
          if (!err) {
            res.send({ status: 400, message: "data updated successfully", data: doc });
            return;
          }
        });
      } else if (product_price) {
        Product.findOneAndUpdate({ id }, { $set: { product_price } },{new:true}, (err, doc) => {
          if (!err) {
            res.send({ status: 400, message: "data updated successfully", data: doc });
            return;
          }
        });
      } else {
        Product.findOneAndUpdate({ id }, { $set: { product_name } },{new:true}, (err, doc) => {
          if (!err) {
            res.send({ status: 400, message: "data updated successfully", data: doc });
            return;
          }
        });
      }

    } else {
      res.send({ status: 404, message: "product update query failed" });
    }
  })
});

module.exports = router;
