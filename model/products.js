const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// shantanuHeady
const productSchema = Schema(
    {
        id: {
            type: String,
            index: true
        },
        product_name: {
            type: String,
            index: true
        },
        product_price: {
            type: Number,
            default: 10
        },
        categories:{
            type:Array
        }
    },
    {
        timestamps: true
    }
);

var Product = mongoose.model("product", productSchema, "product");
module.exports = { Product };
