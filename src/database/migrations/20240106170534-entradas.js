"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("entradas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products", // Nome da tabela referenciada
          key: "id", // Nome do campo referenciado
        },
      },
      qtd: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Adiciona a chave estrangeira
    await queryInterface.addConstraint("entradas", {
      fields: ["product"],
      type: "foreign key",
      name: "fk_entradas_product",
      references: {
        table: "products",
        field: "id",
      },
      onDelete: "cascade", // Ação a ser tomada em caso de exclusão na tabela referenciada
      onUpdate: "cascade", // Ação a ser tomada em caso de atualização na tabela referenciada
    });
  },

  down: async (queryInterface, _Sequelize) => {
    // Remove a tabela e a chave estrangeira
    await queryInterface.removeConstraint("entradas", "fk_entradas_product");
    await queryInterface.dropTable("entradas");
  },
};
