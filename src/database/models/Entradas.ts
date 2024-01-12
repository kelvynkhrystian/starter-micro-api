import { HasManyGetAssociationsMixin, Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import Products from "./Products";

interface Productions {
  id: number;
  entrada: number;
  qtd: number;
  createdAt: Date;
  updatedAt: Date;
}

class Entradas extends Model {
  declare id: number;
  declare product: number;
  declare qtd: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  public getProductions!: HasManyGetAssociationsMixin<Productions>;

  public production!: Productions[];
}

Entradas.init(
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
    tableName: "entradas",
  }
);

Entradas.belongsTo(Products, { foreignKey: "product" });
// Entradas.hasMany(Products, { foreignKey: "entrada" });

export default Entradas;
