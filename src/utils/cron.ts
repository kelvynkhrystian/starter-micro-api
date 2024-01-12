import cron from "node-cron";
import { ModelStatic, Optional } from "sequelize";
import Orders from "../database/models/Entradas";
import resp from "../utils/resp";

const obterHorarioDoBanco = async () => {
  try {
    // Lógica para obter o horário do banco de dados...
    return "24 22"; // 21:57
  } catch (error) {
    console.error("Erro ao obter o horário do banco de dados:", error);
    throw error;
  }
};

interface IOrder {
  id?: number;
  product: number;
  qtd: number;
  origem: string;
  status: string;
}

type OrdersCreationAttributes = Optional<IOrder, "id">;

const orderData: OrdersCreationAttributes = {
  product: 2,
  qtd: 220,
  origem: "Teste",
  status: "Não Iniciada",
};

const createOrder = async (order: OrdersCreationAttributes) => {
  try {
    const newOrder = await Orders.create(order);
    return resp(201, newOrder);
  } catch (error) {
    console.error("Erro ao criar a ordem:", error);
    return resp(500, { error: "A ordem não foi criada" });
  }
};

const agendarTarefaProgramada = async () => {
  try {
    const horario = await obterHorarioDoBanco();

    cron.schedule(`${horario} * * 1-6`, async () => {
      console.log("Função executada no horário programado:", horario);

      try {
        await createOrder(orderData);
      } catch (error) {
        console.error("Erro ao criar a ordem na tarefa programada:", error);
      }
    });
  } catch (error) {
    console.error("Erro ao agendar a tarefa programada:", error);
  }
};

export default agendarTarefaProgramada;
