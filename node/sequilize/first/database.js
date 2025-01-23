const Sequelize = require('sequelize');
const sequielise = new Sequelize(
    'bank',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequielise;