const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    Salary: {
        type: Number,
        required: true
    },
    DateOfJoining: {
        type: Date,
        default: Date.now
    }
});

const empModel = mongoose.model("Employee", empSchema);
module.exports = empModel;
