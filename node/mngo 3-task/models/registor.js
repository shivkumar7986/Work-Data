const mongoose  = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/trendingdripz")

const regUser = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        autoincrement : true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type:String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('registereduser' , regUser);