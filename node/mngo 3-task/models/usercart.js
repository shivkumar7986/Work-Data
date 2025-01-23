const mongoose = require('mongoose');
const products = require('./products');

mongoose.connect("mongodb://127.0.0.1:27017/trendingdripz")


const cartSchema = mongoose.Schema({
    userId:{
       type: String,
    },
    productImg:String ,
    productName:String,
    productPrice:Number
})

module.exports = mongoose.model('cart', cartSchema);