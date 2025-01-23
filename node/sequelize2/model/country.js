const { DataTypes } =  require('sequelize');

const sequelize = require('../config/database');


const country = sequelize.define('country' , {
    countryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    countryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
} , {
    tableName: 'countries',
    timestamps: false
});

module.exports = country;