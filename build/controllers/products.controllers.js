"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_services_1 = __importDefault(require("../services/products.services"));
class ProductsController {
    service = new products_services_1.default();
    async get(req, res, next) {
        try {
            const { status, message } = await this.service.get();
            return res.status(status).json(message);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const { status, message } = await this.service.getById(parseInt(req.params.id, 10));
            return res.status(status).json(message);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const { status, message } = await this.service.create(req.body);
            return res.status(status).json(message);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { status, message } = await this.service.update(id, req.body);
            return res.status(status).json(message);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { status, message } = await this.service.delete(id);
            return res.status(status).json(message);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProductsController;
