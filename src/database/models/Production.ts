import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import Entradas from "./Entradas";

class Production extends Model {
  declare id: number;
  declare entrada: number;
  declare qtd: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Production.init(
  {
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    entrada: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "entradas", // Nome da tabela referenciada
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
    tableName: "production",
  }
);

Production.belongsTo(Entradas, { foreignKey: "entrada" });

export default Production;
