import { ModelStatic, DestroyOptions } from "sequelize";
import Production from "../database/models/Production";
import Entradas from "../database/models/Entradas";
import resp from "../utils/resp";
import sequelize from "sequelize";

class ProductionServices {
  private model: ModelStatic<Production> = Production;

  async get() {
    try {
      const productionWithDetails = await this.model.findAll();
      return resp(200, productionWithDetails);
    } catch (error) {
      return resp(500, { error: "Erro ao receber a listagem das produções" });
    }
  }

  async getById(id: number) {
    try {
      const production = await this.model.findByPk(id);
      if (production) {
        return resp(200, production);
      } else {
        return resp(404, { error: "Produção não encontrada" });
      }
    } catch (error) {
      return resp(500, { error: "Erro ao receber produção específica" });
    }
  }

  async create(productionData: Omit<Entradas, "id">) {
    try {
      const newProducction = await this.model.create(productionData);
      return resp(201, newProducction);
    } catch (error) {
      return resp(500, { error: "A produção não foi criada" });
    }
  }

  async update(id: number, updatedData: Omit<Entradas, "id">) {
    try {
      const [affectedCount] = await this.model.update(updatedData, {
        where: { id },
      });

      if (affectedCount > 0) {
        const updatedProduction = await this.model.findByPk(id);
        return resp(200, updatedProduction);
      } else {
        return resp(404, { error: "Produção não encontrada" });
      }
    } catch (error) {
      return resp(500, { error: "A Produção não foi atualizada" });
    }
  }

  async delete(id: number) {
    try {
      const options: DestroyOptions = {
        where: { id },
      };

      const deletedRows = await this.model.destroy(options);

      if (deletedRows) {
        return resp(200, "Produção deletada com sucesso");
      } else {
        return resp(404, { error: "Produção não encontrada" });
      }
    } catch (error) {
      return resp(500, { error: "A produção não foi apagada" });
    }
  }
}

export default ProductionServices;
