"use strict";
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
        ssl: process.env.DB_SSL,
        dialectOptions: {
            ssl: {
                require: process.env.DB_SSL,
                rejectUnauthorized: false,
            }
        }
    }
);

module.exports = {
    Sequelize: sequelize,
};
