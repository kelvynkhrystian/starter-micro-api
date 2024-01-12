"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const sequelize_2 = __importDefault(require("sequelize"));
const Entradas_1 = __importDefault(require("./Entradas"));
class Production extends sequelize_1.Model {
}
Production.init({
    id: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    entrada: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
        references: {
            model: "entradas",
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
    tableName: "production",
});
Production.belongsTo(Entradas_1.default, { foreignKey: "entrada" });
exports.default = Production;
