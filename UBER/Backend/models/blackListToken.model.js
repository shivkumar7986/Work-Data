const mongoose = require("mongoose");

const blackLIstTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required:true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hourss in seconds
    }
});

module.exports = mongoose.model("blackListToken" , blackLIstTokenSchema)