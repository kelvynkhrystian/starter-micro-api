import { ModelStatic, UpdateOptions, DestroyOptions } from "sequelize";
import Saidas from "../database/models/Saidas";
import Products from "../database/models/Products";
import resp from "../utils/resp";
import sequelize from "sequelize";

class SaidasServices {
  private model: ModelStatic<Saidas> = Saidas;

  async get() {
    try {
      const saidasWithDetails = await this.model.findAll({
        include: [
          {
            model: Products,
            attributes: ["name", "sabor"],
            where: {
              id: sequelize.col("Saidas.product"), // Coluna referente à chave estrangeira
            },
          },
        ],
      });

      return resp(200, saidasWithDetails);
    } catch (error) {
      return resp(500, { error: "Erro ao receber a listagem das Saídas" });
    }
  }

  async getById(id: number) {
    try {
      const saida = await this.model.findByPk(id, {
        include: [
          {
            model: Products,
            attributes: ["name", "sabor"],
            where: {
              id: sequelize.col("Saidas.product"), // Coluna referente à chave estrangeira
            },
          },
        ],
      });
      if (saida) {
        return resp(200, saida);
      } else {
        return resp(404, { error: "Saída não encontrada" });
      }
    } catch (error) {
      return resp(500, { error: "Erro ao receber saída específica" });
    }
  }

  async create(saidaData: Omit<Saidas, "id">) {
    try {
      const newSaida = await this.model.create(saidaData);
      return resp(201, newSaida);
    } catch (error) {
      return resp(500, { error: "A saída não foi criada" });
    }
  }

  async update(id: number, updatedData: Omit<Saidas, "id">) {
    try {
      const [affectedCount] = await this.model.update(updatedData, {
        where: { id },
      });

      if (affectedCount > 0) {
        const updatedOrder = await this.model.findByPk(id);
        return resp(200, updatedOrder);
      } else {
        return resp(404, { error: "Saída não encontrada" });
      }
    } catch (error) {
      return resp(500, { error: "A Saída não foi atualizada" });
    }
  }

  async delete(id: number) {
    try {
      const options: DestroyOptions = {
        where: { id },
      };

      const deletedRows = await this.model.destroy(options);

      if (deletedRows) {
        return resp(200, "Saída deletada com sucesso");
      } else {
        return resp(404, { error: "Saída não encontrada" });
      }
    } catch (error) {
      return resp(500, { error: "A Saída não foi apagada" });
    }
  }
}

export default SaidasServices;
