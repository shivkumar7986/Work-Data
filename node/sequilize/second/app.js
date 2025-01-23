const sequelize = require('./db');
const prodcuts = require('./product');
const supplier = require('./supplier');

sequelize.sync()
.then(()=>{
    console.log('Database synced with products and suppliers tables!');
})

.catch((error)=>{
    console.log(error);
})