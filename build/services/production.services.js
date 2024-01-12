"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Production_1 = __importDefault(require("../database/models/Production"));
const resp_1 = __importDefault(require("../utils/resp"));
class ProductionServices {
    model = Production_1.default;
    async get() {
        try {
            const productionWithDetails = await this.model.findAll();
            return (0, resp_1.default)(200, productionWithDetails);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Erro ao receber a listagem das produções" });
        }
    }
    async getById(id) {
        try {
            const production = await this.model.findByPk(id);
            if (production) {
                return (0, resp_1.default)(200, production);
            }
            else {
                return (0, resp_1.default)(404, { error: "Produção não encontrada" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Erro ao receber produção específica" });
        }
    }
    async create(productionData) {
        try {
            const newProducction = await this.model.create(productionData);
            return (0, resp_1.default)(201, newProducction);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A produção não foi criada" });
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
                return (0, resp_1.default)(404, { error: "Produção não encontrada" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A Produção não foi atualizada" });
        }
    }
    async delete(id) {
        try {
            const options = {
                where: { id },
            };
            const deletedRows = await this.model.destroy(options);
            if (deletedRows) {
                return (0, resp_1.default)(200, "Produção deletada com sucesso");
            }
            else {
                return (0, resp_1.default)(404, { error: "Produção não encontrada" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "A produção não foi apagada" });
        }
    }
}
exports.default = ProductionServices;
