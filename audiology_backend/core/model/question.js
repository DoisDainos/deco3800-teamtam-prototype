const sequelize = require('../database');
const Sequelize = require('sequelize');
const Question = sequelize.define('Question', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    options: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rightanswer: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})
module.exports = Question;