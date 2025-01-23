const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    productImg: {
        type: String,
        required: true
    },
    productId:{
        type:Number,
        unique: true,
        autoincrement: true
    },
    productName : {
        type: String,
        required: true,

    },
    productPrice: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('product' , productModel);