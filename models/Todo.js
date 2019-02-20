const Sequelize = require('sequelize');
const db = require('../config/database');

const Todo = db.define('todo', {
    title: {
        type: Sequelize.STRING
    },
    is_completed: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Todo;