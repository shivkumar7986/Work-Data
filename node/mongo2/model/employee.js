const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/oopsprojects")

const empSchema = mongoose.Schema({
    id: Number,
    name: String,
    salary : Number,
    age: Number
})


module.exports = mongoose.model('employee' , empSchema);