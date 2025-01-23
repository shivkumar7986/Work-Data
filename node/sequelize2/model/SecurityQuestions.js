const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SecurityQuestions = sequelize.define('SecurityQuestions', {
    SecurityQuestionID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    QuestionText: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'SecurityQuestions',
    timestamps: false
});

module.exports = SecurityQuestions;
