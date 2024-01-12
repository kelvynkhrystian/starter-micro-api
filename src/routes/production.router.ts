import { Router } from "express";
import ProductionController from "../controllers/production.controllers";
import { verifyToken } from "../jwt/jwt";
import isAdmin from "../middlewares/isAdmin";

const ProductionRouter = Router();
const controller = new ProductionController();

ProductionRouter.get("/", verifyToken, controller.get.bind(controller));
ProductionRouter.get("/:id", verifyToken, controller.getById.bind(controller));
ProductionRouter.post("/", verifyToken, controller.create.bind(controller));
ProductionRouter.put("/:id", verifyToken, controller.update.bind(controller));

ProductionRouter.delete(
  "/:id",
  verifyToken,
  isAdmin,
  controller.delete.bind(controller)
);

export default ProductionRouter;
