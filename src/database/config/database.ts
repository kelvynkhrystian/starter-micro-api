import "dotenv/config";
import { Options } from "sequelize";

const config: Options = {
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

export = config;
