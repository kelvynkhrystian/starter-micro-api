import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

class Products extends Model {
  declare id: number;
  declare name: string;
  declare sabor: string;
  declare qtd: number;
  declare limite: number;
}

Products.init(
  {
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING(40),
      allowNull: false,
    },
    sabor: {
      type: sequelize.STRING(40),
      allowNull: false,
    },
    qtd: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    limite: {
      type: sequelize.INTEGER,
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
    tableName: "products",
  }
);

export default Products;
