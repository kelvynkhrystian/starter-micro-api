"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const Entradas_1 = __importDefault(require("../database/models/Entradas"));
const resp_1 = __importDefault(require("../utils/resp"));
const obterHorarioDoBanco = async () => {
    try {
        // Lógica para obter o horário do banco de dados...
        return "24 22"; // 21:57
    }
    catch (error) {
        console.error("Erro ao obter o horário do banco de dados:", error);
        throw error;
    }
};
const orderData = {
    product: 2,
    qtd: 220,
    origem: "Teste",
    status: "Não Iniciada",
};
const createOrder = async (order) => {
    try {
        const newOrder = await Entradas_1.default.create(order);
        return (0, resp_1.default)(201, newOrder);
    }
    catch (error) {
        console.error("Erro ao criar a ordem:", error);
        return (0, resp_1.default)(500, { error: "A ordem não foi criada" });
    }
};
const agendarTarefaProgramada = async () => {
    try {
        const horario = await obterHorarioDoBanco();
        node_cron_1.default.schedule(`${horario} * * 1-6`, async () => {
            console.log("Função executada no horário programado:", horario);
            try {
                await createOrder(orderData);
            }
            catch (error) {
                console.error("Erro ao criar a ordem na tarefa programada:", error);
            }
        });
    }
    catch (error) {
        console.error("Erro ao agendar a tarefa programada:", error);
    }
};
exports.default = agendarTarefaProgramada;
