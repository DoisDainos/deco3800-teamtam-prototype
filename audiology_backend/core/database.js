const Sequelize = require('sequelize');
const sequelize =  new Sequelize('question', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})
module.exports = sequelize;