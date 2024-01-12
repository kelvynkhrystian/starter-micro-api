"use strict";
require("dotenv/config");
const config = {
    dialect: "mysql",
    host: process.env.MYSQLHOST,
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: Number(process.env.MYSQLPORT),
    dialectOptions: {
        connectTimeout: 30000, // Ajuste o tempo limite para 30 segundos (em milissegundos)
    },
};
module.exports = config;
