const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.Sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 50],
      },
    },
  },
  {
    // Other model options go here
    tableName: 'Users'
  }
);

module.exports = User;