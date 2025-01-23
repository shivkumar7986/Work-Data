const { Sequelize } = require('sequelize');
const env = require('./env');

const  sequelize = new Sequelize(env.database , env.username , env.password , {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    
    pool: {
        max: env.max,
        min: env.min,
        acquire: env.acquire,
        idle: env.idle
    }
});

module.exports = sequelize;