"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = __importDefault(require("../controllers/users.controllers"));
const jwt_1 = require("../jwt/jwt");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const UsersRouter = (0, express_1.Router)();
const controller = new users_controllers_1.default();
UsersRouter.get("/", jwt_1.verifyToken, isAdmin_1.default, controller.get.bind(controller));
UsersRouter.get("/:id", jwt_1.verifyToken, isAdmin_1.default, controller.getById.bind(controller));
UsersRouter.post("/", jwt_1.verifyToken, isAdmin_1.default, controller.create.bind(controller));
UsersRouter.put("/:id", jwt_1.verifyToken, isAdmin_1.default, controller.update.bind(controller));
UsersRouter.delete("/:id", jwt_1.verifyToken, isAdmin_1.default, controller.delete.bind(controller));
exports.default = UsersRouter;
