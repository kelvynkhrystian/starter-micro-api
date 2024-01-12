"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = __importDefault(require("../controllers/products.controllers"));
const jwt_1 = require("../jwt/jwt");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const ProductsRouter = (0, express_1.Router)();
const controller = new products_controllers_1.default();
ProductsRouter.get("/", jwt_1.verifyToken, controller.get.bind(controller));
ProductsRouter.get("/:id", jwt_1.verifyToken, controller.getById.bind(controller));
ProductsRouter.post("/", jwt_1.verifyToken, isAdmin_1.default, controller.create.bind(controller));
ProductsRouter.put("/:id", jwt_1.verifyToken, controller.update.bind(controller));
ProductsRouter.delete("/:id", jwt_1.verifyToken, isAdmin_1.default, controller.delete.bind(controller));
exports.default = ProductsRouter;
