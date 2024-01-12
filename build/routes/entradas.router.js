"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entradas_controllers_1 = __importDefault(require("../controllers/entradas.controllers"));
const jwt_1 = require("../jwt/jwt");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const EntradasRouter = (0, express_1.Router)();
const controller = new entradas_controllers_1.default();
EntradasRouter.get("/", jwt_1.verifyToken, controller.get.bind(controller));
EntradasRouter.get("/:id", jwt_1.verifyToken, controller.getById.bind(controller));
EntradasRouter.post("/", jwt_1.verifyToken, controller.create.bind(controller));
EntradasRouter.put("/:id", jwt_1.verifyToken, controller.update.bind(controller));
EntradasRouter.delete("/:id", jwt_1.verifyToken, isAdmin_1.default, controller.delete.bind(controller));
exports.default = EntradasRouter;
