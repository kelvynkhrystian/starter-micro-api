"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_services_1 = __importDefault(require("../services/users.services"));
const jwt_1 = require("../jwt/jwt");
class LoginController {
    service = new users_services_1.default();
    teste(_req, res) {
        return res.status(200).json("API - Online");
    }
    async login(req, res, next) {
        try {
            const { status, message } = await this.service.login(req.body);
            return res.status(status).json(message);
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res) {
        try {
            const token = req.header("Authorization");
            if (!token)
                return res.status(401).json({ message: "Não autorizado" });
            // Adicione o token à lista negra
            (0, jwt_1.addToBlacklist)(token);
            return res.status(200).json({ message: "Logout bem-sucedido" });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao efetuar logout" });
        }
    }
}
exports.default = LoginController;
