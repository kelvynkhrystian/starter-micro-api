"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entradas_1 = __importDefault(require("../database/models/Entradas"));
const Products_1 = __importDefault(require("../database/models/Products"));
const resp_1 = __importDefault(require("../utils/resp"));
const sequelize_1 = __importDefault(require("sequelize"));
const Production_1 = __importDefault(require("../database/models/Production"));
class EntradasServices {
    model = Entradas_1.default;
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
    async get() {
        try {
            const entradasWithDetails = await this.model.findAll({
                include: [
                    {
                        model: Products_1.default,
                        attributes: ["name", "sabor"],
                        where: {
                            id: sequelize_1.default.col("Entradas.product"),
                        },
                    },
                ],
            });
            const productions = await Production_1.default.findAll();
            const mapEntradasParaProductions = {};
            productions.forEach((item) => {
                if (!mapEntradasParaProductions[item.entrada]) {
                    mapEntradasParaProductions[item.entrada] = [];
                }
                mapEntradasParaProductions[item.entrada].push(item);
            });
            const resultado = entradasWithDetails.map((entrada) => ({
                ...entrada.toJSON(),
                productions: mapEntradasParaProductions[entrada.id] || [],
            }));
            return (0, resp_1.default)(200, resultado);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Erro ao receber a listagem das entradas" });
        }
    }
    async getById(id) {
        try {
            const entrada = await this.model.findByPk(id, {
                include: [
                    {
                        model: Products_1.default,
                        attributes: ["name", "sabor"],
                    },
                ],
            });
            const productions = await Production_1.default.findAll({
                where: { entrada: entrada?.id },
            });
            const response = [entrada, productions];
            return (0, resp_1.default)(200, response);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Erro ao receber entrada específica" });
        }
    }
    async create(entradaData) {
        try {
            const newEntrada = await this.model.create(entradaData);
            return (0, resp_1.default)(201, newEntrada);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A entrada não foi criada" });
        }
    }
    async update(id, updatedData) {
        try {
            const [affectedCount] = await this.model.update(updatedData, {
                where: { id },
            });
            if (affectedCount > 0) {
                const updatedProduction = await this.model.findByPk(id);
                return (0, resp_1.default)(200, updatedProduction);
            }
            else {
                return (0, resp_1.default)(404, { error: "Entrada não encontrada" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A entrada não foi atualizada" });
        }
    }
    async delete(id) {
        try {
            const options = {
                where: { id },
            };
            const deletedRows = await this.model.destroy(options);
            if (deletedRows) {
                return (0, resp_1.default)(200, "Entrada deletada com sucesso");
            }
            else {
                return (0, resp_1.default)(404, { error: "Entrada não encontrada" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A entrada não foi apagada" });
        }
    }
}
exports.default = EntradasServices;
