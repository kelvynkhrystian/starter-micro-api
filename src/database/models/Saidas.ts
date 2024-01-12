import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import Products from "./Products";

class Saidas extends Model {
  declare id: number;
  declare product: number;
  declare qtd: number;
  declare obs: string;
}

Saidas.init(
  {
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products", // Nome da tabela referenciada
        key: "id", // Nome do campo referenciado
      },
    },
    qtd: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    obs: {
      type: sequelize.STRING(150),
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: db,
    tableName: "saidas",
  }
);

Saidas.belongsTo(Products, { foreignKey: "product" });

export default Saidas;
