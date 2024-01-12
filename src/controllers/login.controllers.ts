import { Request, Response, NextFunction } from "express";
import UsersServices from "../services/users.services";
import { addToBlacklist } from "../jwt/jwt";

class LoginController {
  private service = new UsersServices();

  teste(_req: Request, res: Response) {
    return res.status(200).json("API - Online");
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.login(req.body);
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const token = req.header("Authorization");
      if (!token) return res.status(401).json({ message: "Não autorizado" });

      // Adicione o token à lista negra
      addToBlacklist(token);

      return res.status(200).json({ message: "Logout bem-sucedido" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao efetuar logout" });
    }
  }
}

export default LoginController;
