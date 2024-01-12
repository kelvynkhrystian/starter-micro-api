"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../database/models/Users"));
const resp_1 = __importDefault(require("../utils/resp"));
const md5_1 = __importDefault(require("md5"));
const jwt_1 = require("../jwt/jwt");
const schema_1 = __importDefault(require("../services/validations/schema"));
class UsersServices {
    model = Users_1.default;
    async get() {
        try {
            const users = await this.model.findAll();
            return (0, resp_1.default)(200, users);
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Erro ao receber listagem de usuários" });
        }
    }
    async getById(id) {
        try {
            const user = await this.model.findByPk(id);
            if (user) {
                return (0, resp_1.default)(200, user);
            }
            else {
                return (0, resp_1.default)(404, { error: "Usuário não existe" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, {
                error: "Erro ao receber informações de um user específico",
            });
        }
    }
    async login(body) {
        const hashPass = (0, md5_1.default)(body.pass);
        const user = await this.model.findOne({
            where: {
                username: body.username,
                pass: hashPass,
            },
        });
        if (!user)
            return (0, resp_1.default)(404, "Usuário não encontrado");
        const { id, username } = user;
        // Gere um novo token
        const token = (0, jwt_1.sign)({ id, username });
        // Retorne o novo token
        return (0, resp_1.default)(200, { id, username, token });
    }
    async create(user) {
        const { error } = schema_1.default.user.validate(user);
        if (error)
            return (0, resp_1.default)(422, error.message);
        const hashPass = (0, md5_1.default)(user.pass);
        const createdUser = await this.model.create({
            ...user,
            pass: hashPass,
        });
        return (0, resp_1.default)(201, createdUser);
    }
    async update(id, updatedData) {
        try {
            if (updatedData.pass) {
                updatedData.pass = (0, md5_1.default)(updatedData.pass);
            }
            const [affectedCount] = await this.model.update(updatedData, {
                where: { id },
            });
            if (affectedCount > 0) {
                const updatedProduct = await this.model.findByPk(id);
                return (0, resp_1.default)(200, updatedProduct);
            }
            else {
                return (0, resp_1.default)(404, { error: "Usuário não encontrado" });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "As informações não foram editadas" });
        }
    }
    async delete(id) {
        try {
            const options = {
                where: { id },
            };
            const deletedRows = await this.model.destroy(options);
            if (deletedRows) {
                return (0, resp_1.default)(200, "Usuário deletado com sucesso");
            }
            else {
                return (0, resp_1.default)(404, {
                    error: "O Usuário não foi encontrado ou não existe",
                });
            }
        }
        catch (error) {
            return (0, resp_1.default)(500, { error: "Usuário não foi deletado" });
        }
    }
}
exports.default = UsersServices;
