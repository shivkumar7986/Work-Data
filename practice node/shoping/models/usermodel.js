const mongoose = require('mongoose');

const userModel =  mongoose.Schema({
    
    username: String,
    name: String,
    email: String,
    password: String,
    cart: [
        {type:mongoose.Schema.Types.ObjectId , ref:'productModel'}
    ]

})

module.exports = mongoose.model("user" , userModel)