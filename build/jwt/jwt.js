"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenBlacklisted = exports.addToBlacklist = exports.verifyToken = exports.sign = void 0;
// Importe as bibliotecas necessárias
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
// Defina a chave secreta
const secret = process.env.JWT_SECRET;
// Crie a lista negra de tokens
const blacklistedTokens = new Set();
// Função para adicionar tokens à lista negra
const addToBlacklist = (token) => {
    blacklistedTokens.add(token);
};
exports.addToBlacklist = addToBlacklist;
// Função para verificar se um token está na lista negra
const isTokenBlacklisted = (token) => {
    return blacklistedTokens.has(token);
};
exports.isTokenBlacklisted = isTokenBlacklisted;
// Função para gerar um novo token JWT
const sign = (payload) => {
    const jwtConfig = {
        algorithm: "HS256",
        expiresIn: "12h",
    };
    return jsonwebtoken_1.default.sign(payload, secret, jwtConfig);
};
exports.sign = sign;
// Middleware para verificar o token em requisições
const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(401).json({ message: "Não autorizado" });
        // Configurações para verificar o token
        const jwtVerifyOptions = {
            algorithms: ["HS256"],
        };
        // Verifique se o token está na lista negra antes de prosseguir
        if (isTokenBlacklisted(token)) {
            return res.status(401).json({ message: "Token Revogado" });
        }
        // Verifique o token
        const decoded = jsonwebtoken_1.default.verify(token, secret, jwtVerifyOptions);
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.verifyToken = verifyToken;
