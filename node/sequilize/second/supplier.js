const { Sequelize } = require('sequelize');
const sequelize = require('./db');  // Database connection ko import karna

const Supplier = sequelize.define('Supplier', {
    supplier_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact_info: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'suppliers',  // Suppliers table ka naam
    timestamps: true         // Timestamps (createdAt, updatedAt) enable karna
});



module.exports = Supplier
