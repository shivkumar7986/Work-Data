const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/oopsprojects');


const loginSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        autoincrement: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    empId: {
        type: Number,
        unique: true,
    }
})

module.exports = mongoose.model('login', loginSchema);