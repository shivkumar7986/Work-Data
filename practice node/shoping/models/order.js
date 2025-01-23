const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');



const orderSchema = mongoose.Schema({
    billNo: {type:Number , required:true , unique:true},
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true},
    products: [], 
    orderStatus:{type: String , default:'pending'},
    totalAmount: { type: String, required: true, default: 0 }, 
}, { timestamps: true });

module.exports = mongoose.model('Orders', orderSchema);
