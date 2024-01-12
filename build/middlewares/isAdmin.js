"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    // Verifique se o usuário está autenticado e tem o nome 'admin'
    if (res.locals.user && res.locals.user.username === "admin") {
        return next(); // Continue para a próxima rota
    }
    // Caso contrário, envie uma resposta de acesso não autorizado
    return res.status(403).json({
        message: "Acesso não autorizado, somente o admin tem acesso a esta ambiente",
    });
};
exports.default = isAdmin;
