const { Sequelize } = require('sequelize');

const sequelize = require('./db');

let product = sequelize.define('products', {
    product_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'prodcuts',
    timestamps: true
});

module.exports = product;