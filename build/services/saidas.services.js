"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Saidas_1 = __importDefault(require("../database/models/Saidas"));
const Products_1 = __importDefault(require("../database/models/Products"));
const resp_1 = __importDefault(require("../utils/resp"));
const sequelize_1 = __importDefault(require("sequelize"));
class SaidasServices {
    model = Saidas_1.default;
    async get() {
        try {
            const saidasWithDetails = await this.model.findAll({
                include: [
                    {
                        model: Products_1.default,
                        attributes: ["name", "sabor"],
                        where: {
                            id: sequelize_1.default.col("Saidas.product"), // Coluna referente à chave estrangeira
                        },
                    },
                ],
            });
            return (0, resp_1.default)(200, saidasWithDetails);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Erro ao receber a listagem das Saídas" });
        }
    }
    async getById(id) {
        try {
            const saida = await this.model.findByPk(id, {
                include: [
                    {
                        model: Products_1.default,
                        attributes: ["name", "sabor"],
                        where: {
                            id: sequelize_1.default.col("Saidas.product"), // Coluna referente à chave estrangeira
                        },
                    },
                ],
            });
            if (saida) {
                return (0, resp_1.default)(200, saida);
            }
            else {
                return (0, resp_1.default)(404, { error: "Saída não encontrada" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Erro ao receber saída específica" });
        }
    }
    async create(saidaData) {
        try {
            const newSaida = await this.model.create(saidaData);
            return (0, resp_1.default)(201, newSaida);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A saída não foi criada" });
        }
    }
    async update(id, updatedData) {
        try {
            const [affectedCount] = await this.model.update(updatedData, {
                where: { id },
            });
            if (affectedCount > 0) {
                const updatedOrder = await this.model.findByPk(id);
                return (0, resp_1.default)(200, updatedOrder);
            }
            else {
                return (0, resp_1.default)(404, { error: "Saída não encontrada" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A Saída não foi atualizada" });
        }
    }
    async delete(id) {
        try {
            const options = {
                where: { id },
            };
            const deletedRows = await this.model.destroy(options);
            if (deletedRows) {
                return (0, resp_1.default)(200, "Saída deletada com sucesso");
            }
            else {
                return (0, resp_1.default)(404, { error: "Saída não encontrada" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A Saída não foi apagada" });
        }
    }
}
exports.default = SaidasServices;
