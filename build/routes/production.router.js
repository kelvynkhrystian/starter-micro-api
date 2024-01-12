"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const production_controllers_1 = __importDefault(require("../controllers/production.controllers"));
const jwt_1 = require("../jwt/jwt");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const ProductionRouter = (0, express_1.Router)();
const controller = new production_controllers_1.default();
ProductionRouter.get("/", jwt_1.verifyToken, controller.get.bind(controller));
ProductionRouter.get("/:id", jwt_1.verifyToken, controller.getById.bind(controller));
ProductionRouter.post("/", jwt_1.verifyToken, controller.create.bind(controller));
ProductionRouter.put("/:id", jwt_1.verifyToken, controller.update.bind(controller));
ProductionRouter.delete("/:id", jwt_1.verifyToken, isAdmin_1.default, controller.delete.bind(controller));
exports.default = ProductionRouter;
