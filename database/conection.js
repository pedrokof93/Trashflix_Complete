const sequelize = require('sequelize')

const connection = new sequelize('cadastrouser', 'root', '18051993',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
