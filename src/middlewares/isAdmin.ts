import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Verifique se o usuário está autenticado e tem o nome 'admin'
  if (res.locals.user && res.locals.user.username === "admin") {
    return next(); // Continue para a próxima rota
  }

  // Caso contrário, envie uma resposta de acesso não autorizado
  return res.status(403).json({
    message:
      "Acesso não autorizado, somente o admin tem acesso a esta ambiente",
  });
};

export default isAdmin;
