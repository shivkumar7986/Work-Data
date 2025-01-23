const Sequelize = require('sequelize');
const sequelize = require('./database');
const user = sequelize.define('user' , {
    user_id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name:{type: Sequelize.STRING , allowNull: false},

    email:{type: Sequelize.STRING , allowNull: false},

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = user;