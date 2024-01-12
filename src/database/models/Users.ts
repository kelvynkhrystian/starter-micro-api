import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

class Products extends Model {
  declare id: number;
  declare username: string;
  declare pass: string;
  declare permission: number;
}

Products.init(
  {
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: sequelize.STRING(40),
      unique: true,
      allowNull: false,
    },
    pass: {
      type: sequelize.STRING(40),
      allowNull: false,
    },
    permission: {
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
    tableName: "users",
    timestamps: false,
  }
);

export default Products;
