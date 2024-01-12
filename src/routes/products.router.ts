import { Router } from "express";
import ProductsController from "../controllers/products.controllers";
import { verifyToken } from "../jwt/jwt";
import isAdmin from "../middlewares/isAdmin";

const ProductsRouter = Router();
const controller = new ProductsController();

ProductsRouter.get("/", verifyToken, controller.get.bind(controller));
ProductsRouter.get("/:id", verifyToken, controller.getById.bind(controller));
ProductsRouter.post(
  "/",
  verifyToken,
  isAdmin,
  controller.create.bind(controller)
);
ProductsRouter.put("/:id", verifyToken, controller.update.bind(controller));
ProductsRouter.delete(
  "/:id",
  verifyToken,
  isAdmin,
  controller.delete.bind(controller)
);

export default ProductsRouter;
