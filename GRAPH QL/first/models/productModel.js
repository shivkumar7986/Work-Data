const mongoose = require('mongoose');

const productsListSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  colors: {
    type: [String], 
    default: [],
  },
  imgPath: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model('productlists', productsListSchema);
