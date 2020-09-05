const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var categorySchema = Schema(
  {
    catgegory_name: {
      type: String,
      index: true
    },
    category_type: {
      type: String // parent or child (top if parent base if child of some parent)
    },
    id: {
      type: String,
      index: true
    },
    parent_category: {
       type:String 
    }
  },
  {
    timestamps: true
  }
);

var Category = mongoose.model("category", categorySchema, "category");
module.exports = { Category };
