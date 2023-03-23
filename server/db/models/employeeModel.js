let Sequelize = require('sequelize');
const db = require('../config');

const Employee = db.define('Employees',{
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    confirmPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN
    },
    country:{
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING
    }
},
{
    timestamps: true
})

module.exports = Employee;