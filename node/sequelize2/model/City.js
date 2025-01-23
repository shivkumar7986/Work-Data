// models/City.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const State = require('./State');

const City = sequelize.define('City', {
    CityID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CityName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StateID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'States',
            key: 'StateID'
        }
    }
}, {
    tableName: 'Cities',
    timestamps: false
});

State.hasMany(City, { foreignKey: 'StateID' });
City.belongsTo(State, { foreignKey: 'StateID' });

module.exports = City;
