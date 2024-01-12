import { Router } from "express";
import LoginController from "../controllers/login.controllers";

const LoginRouter = Router();
const controller = new LoginController();

LoginRouter.get("/", controller.teste.bind(controller));
LoginRouter.post("/", controller.login.bind(controller));
// criar rota logout

export default LoginRouter;
