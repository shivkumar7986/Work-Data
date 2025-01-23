// models/State.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const State = sequelize.define('State', {
    StateID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    StateName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CountryID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Countries',
            key: 'CountryID'
        }
    }
}, {
    tableName: 'States',
    timestamps: false
});

module.exports = State;
