const { DataTypes } = require('sequelize');
const db = require('../db');

const Post = db.Sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Post;