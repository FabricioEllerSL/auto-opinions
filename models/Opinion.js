const { DataTypes, Sequelize } = require('sequelize');

const db = require('../db/conn')

const User = require('./User')

const Opinion = db.define('Opinion', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
})

Opinion.belongsTo(User)
User.hasMany(Opinion)

module.exports = Opinion