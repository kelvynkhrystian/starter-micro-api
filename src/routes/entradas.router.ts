import { Router } from "express";
import EntradasController from "../controllers/entradas.controllers";
import { verifyToken } from "../jwt/jwt";
import isAdmin from "../middlewares/isAdmin";

const EntradasRouter = Router();
const controller = new EntradasController();

EntradasRouter.get("/", verifyToken, controller.get.bind(controller));
EntradasRouter.get("/:id", verifyToken, controller.getById.bind(controller));
EntradasRouter.post("/", verifyToken, controller.create.bind(controller));
EntradasRouter.put("/:id", verifyToken, controller.update.bind(controller));

EntradasRouter.delete(
  "/:id",
  verifyToken,
  isAdmin,
  controller.delete.bind(controller)
);

export default EntradasRouter;
