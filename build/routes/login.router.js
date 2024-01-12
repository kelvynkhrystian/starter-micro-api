"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = __importDefault(require("../controllers/login.controllers"));
const LoginRouter = (0, express_1.Router)();
const controller = new login_controllers_1.default();
LoginRouter.get("/", controller.teste.bind(controller));
LoginRouter.post("/", controller.login.bind(controller));
// criar rota logout
exports.default = LoginRouter;
