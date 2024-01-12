"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Coxinha",
          sabor: "Tradicional",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Croissant",
          sabor: "Queijo com Presunto",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Croissant",
          sabor: "Frango com Req",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Croissant",
          sabor: "Queijo",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Croissant",
          sabor: "Hot dog com Cheddar",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Croissant",
          sabor: "P. de Peru com Req",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Croissant",
          sabor: "Chocolate",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Croissant",
          sabor: "Romeu e Julieta",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Hambúrguer",
          sabor: "Carne com Cheddar",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Almofadinha",
          sabor: "Calabresa com Req",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Almofadinha",
          sabor: "Carne Moída",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Doguinho",
          sabor: "Salsicha Molho Queijo",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Italiano",
          sabor: "Queijo Presunto",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Italiano",
          sabor: "Frango Req",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Italiano",
          sabor: "Calabresa com Req",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Folhado",
          sabor: "Carne com Cheddar",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Folhado",
          sabor: "Queijo",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Folhado",
          sabor: "Queijo com Presunto",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Folhado",
          sabor: "Frango com Req",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Folhado",
          sabor: "Salsicha",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Folhado",
          sabor: "Salsicha Mussarela",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Folhado",
          sabor: "Peito de Peru",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Folhado",
          sabor: "Calabresa",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Pizza Brotinho",
          sabor: "Calabresa",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Pizza Brotinho",
          sabor: "Napolitana",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Pízza Brotinho",
          sabor: "Mussarela",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Bomba",
          sabor: "Queijo e Presunto",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Empada",
          sabor: "Frango",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Mini Coxinha",
          sabor: "Tradicional",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Mini Kibe",
          sabor: "Tradicional",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Travesseirinho",
          sabor: "Queijo com Presunto",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Mini Folhado",
          sabor: "Queijo Coalho",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Mini Folhado",
          sabor: "Goiabada",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Mini Folhado",
          sabor: "Frango com Req",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Mini Croissant",
          sabor: "Frango com Req",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Mini Croissant",
          sabor: "Queijo Coalho",
          qtd: 0,
          limite: 0,
        },
        {
          name: "Mini Croissant",
          sabor: "Goiabada",
          qtd: 0,
          limite: 0,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remova os dados inseridos acima ao reverter o seeder
    await queryInterface.bulkDelete("products", null, {});
  },
};
