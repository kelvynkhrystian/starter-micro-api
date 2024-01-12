"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const sequelize_2 = __importDefault(require("sequelize"));
class Products extends sequelize_1.Model {
}
Products.init({
    id: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_2.default.STRING(40),
        allowNull: false,
    },
    sabor: {
        type: sequelize_2.default.STRING(40),
        allowNull: false,
    },
    qtd: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
    },
    limite: {
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
    tableName: "products",
});
exports.default = Products;
