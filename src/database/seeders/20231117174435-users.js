"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insira alguns dados iniciais para a tabela users
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          pass: "c8a32c7f04e2abea600ddf7caed65fff",
          permission: 1,
        },
        {
          username: "manager",
          pass: "c8a32c7f04e2abea600ddf7caed65fff",
          permission: 2,
        },
        {
          username: "operator",
          pass: "c8a32c7f04e2abea600ddf7caed65fff",
          permission: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remova os dados inseridos acima ao reverter o seeder
    await queryInterface.bulkDelete("users", null, {});
  },
};
