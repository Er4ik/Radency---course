"use strict";

const { Sequelize } = require("sequelize");
const { DB_CONFIG } = require("../config/config.json");

const sequelize = new Sequelize(DB_CONFIG.DB_NAME, DB_CONFIG.DB_USER_NAME, DB_CONFIG.DB_PASSWORD, {
    host: DB_CONFIG.HOST,
    dialect: DB_CONFIG.DIALECT,
});

const note = require("./model/noteModel.js")(sequelize);

module.exports = note;
