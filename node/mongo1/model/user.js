const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/studentDt');

 const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    marks: Number
})

module.exports = mongoose.model('student' , userSchema)