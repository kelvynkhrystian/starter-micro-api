import { Router } from "express";
import UsersController from "../controllers/users.controllers";
import { verifyToken } from "../jwt/jwt";
import isAdmin from "../middlewares/isAdmin";

const UsersRouter = Router();
const controller = new UsersController();

UsersRouter.get("/", verifyToken, isAdmin, controller.get.bind(controller));

UsersRouter.get(
  "/:id",
  verifyToken,
  isAdmin,
  controller.getById.bind(controller)
);

UsersRouter.post("/", verifyToken, isAdmin, controller.create.bind(controller));

UsersRouter.put(
  "/:id",
  verifyToken,
  isAdmin,
  controller.update.bind(controller)
);

UsersRouter.delete(
  "/:id",
  verifyToken,
  isAdmin,
  controller.delete.bind(controller)
);

export default UsersRouter;
