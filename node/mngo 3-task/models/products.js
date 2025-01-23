const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/trendingdripz")

const productSchema = mongoose.Schema({
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

module.exports = mongoose.model('product' , productSchema)