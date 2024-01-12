import { Router } from "express";
import SaidasController from "../controllers/saidas.controllers";
import { verifyToken } from "../jwt/jwt";
import isAdmin from "../middlewares/isAdmin";

const SaidasRouter = Router();
const controller = new SaidasController();

SaidasRouter.get("/", verifyToken, controller.get.bind(controller));
SaidasRouter.get("/:id", verifyToken, controller.getById.bind(controller));
SaidasRouter.post("/", verifyToken, controller.create.bind(controller));
SaidasRouter.put("/:id", verifyToken, controller.update.bind(controller));

SaidasRouter.delete(
  "/:id",
  verifyToken,
  isAdmin,
  controller.delete.bind(controller)
);

export default SaidasRouter;
