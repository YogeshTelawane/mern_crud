const {Sequelize} = require('sequelize');

const db = new Sequelize('Employee', 'postgres', '410206', {
    host: 'localhost',
    dialect: 'postgres'
})

db.sync().then(()=>console.log('tables created')).catch((err)=>console.log(err))

module.exports = db;