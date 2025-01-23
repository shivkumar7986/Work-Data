const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const SecurityQuestions = require('./SecurityQuestions')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'FirstName'  // Maps to DB column
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'LastName'  // Maps to DB column
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'DOB'
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Gender'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Address'
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'City'
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'State'
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Country'
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'PhoneNumber'
    },
    emailID: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        field: 'EmailID'
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'UserName'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Password'
    },
    securityQuestionID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'SecurityQuestions',  // Ensure correct reference model/table
            key: 'SecurityQuestionID'
        },
        field: 'SecurityQuestionID'
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Answer'
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'IsApproved'
    }
}, {
    tableName: 'Users',
    timestamps: false
});

module.exports = User;
