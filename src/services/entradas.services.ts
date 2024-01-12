import { ModelStatic, DestroyOptions, Includeable } from "sequelize";
import Entradas from "../database/models/Entradas";
import Products from "../database/models/Products";
import resp from "../utils/resp";
import sequelize from "sequelize";
import Production from "../database/models/Production";

interface Productions {
  id: number;
  entrada: number;
  qtd: number;
  createdAt: Date;
  updatedAt: Date;
}

interface EntradaWithProductions {
  id: number;
  // Adicione aqui outros campos necessários para a entrada
  productions: Productions[]; // Certifique-se de substituir 'Productions' pelo nome correto do seu tipo de dados
}

class EntradasServices {
  private model: ModelStatic<Entradas> = Entradas;

  // async get() {
  //   try {
  //     const entradasWithDetails = await this.model.findAll({
  //       include: [
  //         {
  //           model: Products,
  //           attributes: ["name", "sabor"],
  //           where: {
  //             id: sequelize.col("Entradas.product"), // Coluna referente à chave estrangeira
  //           },
  //         },
  //       ],
  //     });

  //     const productions = await Production.findAll({});

  //     return resp(200, entradasWithDetails);
  //   } catch (error) {
  //     return resp(500, { error: "Erro ao receber a listagem das entradas" });
  //   }
  // }

  async get(): Promise<any> {
    try {
      const entradasWithDetails = await this.model.findAll({
        include: [
          {
            model: Products,
            attributes: ["name", "sabor"],
            where: {
              id: sequelize.col("Entradas.product"),
            },
          },
        ] as Includeable[],
      });

      const productions = await Production.findAll();

      const mapEntradasParaProductions: Record<number, Productions[]> = {};

      productions.forEach((item) => {
        if (!mapEntradasParaProductions[item.entrada]) {
          mapEntradasParaProductions[item.entrada] = [];
        }
        mapEntradasParaProductions[item.entrada].push(item);
      });

      const resultado: EntradaWithProductions[] = entradasWithDetails.map(
        (entrada) => ({
          ...entrada.toJSON(),
          productions: mapEntradasParaProductions[entrada.id] || [],
        })
      );

      return resp(200, resultado);
    } catch (error) {
      return resp(500, { error: "Erro ao receber a listagem das entradas" });
    }
  }

  async getById(id: number) {
    try {
      const entrada = await this.model.findByPk(id, {
        include: [
          {
            model: Products,
            attributes: ["name", "sabor"],
          },
        ],
      });

      const productions = await Production.findAll({
        where: { entrada: entrada?.id },
      });

      const response = [entrada, productions];

      return resp(200, response);
    } catch (error) {
      return resp(500, { error: "Erro ao receber entrada específica" });
    }
  }

  async create(entradaData: Omit<Entradas, "id">) {
    try {
      const newEntrada = await this.model.create(entradaData);
      return resp(201, newEntrada);
    } catch (error) {
      return resp(500, { error: "A entrada não foi criada" });
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
        return resp(404, { error: "Entrada não encontrada" });
      }
    } catch (error) {
      return resp(500, { error: "A entrada não foi atualizada" });
    }
  }

  async delete(id: number) {
    try {
      const options: DestroyOptions = {
        where: { id },
      };

      const deletedRows = await this.model.destroy(options);

      if (deletedRows) {
        return resp(200, "Entrada deletada com sucesso");
      } else {
        return resp(404, { error: "Entrada não encontrada" });
      }
    } catch (error) {
      return resp(500, { error: "A entrada não foi apagada" });
    }
  }
}

export default EntradasServices;
