"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const sequelize_2 = __importDefault(require("sequelize"));
const Products_1 = __importDefault(require("./Products"));
class Entradas extends sequelize_1.Model {
    getProductions;
    production;
}
Entradas.init({
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
    tableName: "entradas",
});
Entradas.belongsTo(Products_1.default, { foreignKey: "product" });
// Entradas.hasMany(Products, { foreignKey: "entrada" });
exports.default = Entradas;
