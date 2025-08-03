const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  category: String
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;


