import { Request, Response, NextFunction } from "express";
import EntradasServices from "../services/entradas.services";

class EntradasController {
  private service = new EntradasServices();

  async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.get();
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getById(
        parseInt(req.params.id, 10)
      );
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.create(req.body);
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const { status, message } = await this.service.update(id, req.body);

      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const { status, message } = await this.service.delete(id);
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default EntradasController;
