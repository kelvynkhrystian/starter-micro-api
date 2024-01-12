"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const saidas_controllers_1 = __importDefault(require("../controllers/saidas.controllers"));
const jwt_1 = require("../jwt/jwt");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const SaidasRouter = (0, express_1.Router)();
const controller = new saidas_controllers_1.default();
SaidasRouter.get("/", jwt_1.verifyToken, controller.get.bind(controller));
SaidasRouter.get("/:id", jwt_1.verifyToken, controller.getById.bind(controller));
SaidasRouter.post("/", jwt_1.verifyToken, controller.create.bind(controller));
SaidasRouter.put("/:id", jwt_1.verifyToken, controller.update.bind(controller));
SaidasRouter.delete("/:id", jwt_1.verifyToken, isAdmin_1.default, controller.delete.bind(controller));
exports.default = SaidasRouter;
