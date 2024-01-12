"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_router_1 = __importDefault(require("./routes/products.router"));
const production_router_1 = __importDefault(require("./routes/production.router"));
const entradas_router_1 = __importDefault(require("./routes/entradas.router"));
const saidas_router_1 = __importDefault(require("./routes/saidas.router"));
const users_router_1 = __importDefault(require("./routes/users.router"));
const login_router_1 = __importDefault(require("./routes/login.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/", login_router_1.default);
app.use("/users", users_router_1.default);
app.use("/products", products_router_1.default);
app.use("/saidas", saidas_router_1.default);
app.use("/entradas", entradas_router_1.default);
app.use("/production", production_router_1.default);
app.use((err, _req, res, _next) => {
    return res.status(500).json({ message: err.message });
});
exports.default = app;
