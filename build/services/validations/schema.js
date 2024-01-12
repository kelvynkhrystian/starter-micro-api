"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
// Definindo um esquema de validação
const user = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    pass: Joi.string().min(3).required(),
    permission: Joi.number().required(),
});
exports.default = { user };
