var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Login = new Schema({
    id: {type:Number, 
        unique:true,
        autoincrement : true} ,
    username : {type: String,
                unique: true,
                required:true} ,
    password : {type: String,
                required:true} ,
    empId: {type: Number,
            unique: true,}
});

module.exports = mongoose.model('Login', Login);