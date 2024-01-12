"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = __importDefault(require("../database/models/Products"));
const resp_1 = __importDefault(require("../utils/resp"));
class ProductsServices {
    model = Products_1.default;
    async get() {
        try {
            const products = await this.model.findAll();
            return (0, resp_1.default)(200, products);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Erro ao receber listagem de produtos" });
        }
    }
    async getById(id) {
        try {
            const product = await this.model.findByPk(id);
            if (product) {
                return (0, resp_1.default)(200, product);
            }
            else {
                return (0, resp_1.default)(404, { error: "Produto não encontrado" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, {
                error: "Erro ao receber infos do produto específico",
            });
        }
    }
    async create(productData) {
        try {
            const newProduct = await this.model.create(productData);
            return (0, resp_1.default)(201, newProduct);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "O produto não foi criado" });
        }
    }
    async update(id, updatedData) {
        try {
            const [affectedCount] = await this.model.update(updatedData, {
                where: { id },
            });
            if (affectedCount > 0) {
                const updatedProduct = await this.model.findByPk(id);
                return (0, resp_1.default)(200, updatedProduct);
            }
            else {
                return (0, resp_1.default)(404, { error: "Produto não encontrado" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "O produto não foi editado" });
        }
    }
    async delete(id) {
        try {
            const options = {
                where: { id },
            };
            const deletedRows = await this.model.destroy(options);
            if (deletedRows) {
                return (0, resp_1.default)(200, "Produto deletado com sucesso");
            }
            else {
                return (0, resp_1.default)(404, {
                    error: "O Produto não foi encontrado ou não existe",
                });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "O produto não foi deletado" });
        }
    }
}
exports.default = ProductsServices;
