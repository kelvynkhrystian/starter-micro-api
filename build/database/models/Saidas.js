"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const sequelize_2 = __importDefault(require("sequelize"));
const Products_1 = __importDefault(require("./Products"));
class Saidas extends sequelize_1.Model {
}
Saidas.init({
    id: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    product: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id", // Nome do campo referenciado
        },
    },
    qtd: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
    },
    obs: {
        type: sequelize_2.default.STRING(150),
        allowNull: false,
    },
    createdAt: {
        type: sequelize_2.default.DATE,
        allowNull: false,
        defaultValue: sequelize_2.default.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: sequelize_2.default.DATE,
        allowNull: false,
        defaultValue: sequelize_2.default.literal("CURRENT_TIMESTAMP"),
    },
}, {
    sequelize: _1.default,
    tableName: "saidas",
});
Saidas.belongsTo(Products_1.default, { foreignKey: "product" });
exports.default = Saidas;
