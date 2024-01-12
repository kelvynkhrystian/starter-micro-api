import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import productsRouter from "./routes/products.router";
import productionRouter from "./routes/production.router";
import entradasRouter from "./routes/entradas.router";
import saidasRouter from "./routes/saidas.router";
import usersRouter from "./routes/users.router";
import loginRouter from "./routes/login.router";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/saidas", saidasRouter);
app.use("/entradas", entradasRouter);
app.use("/production", productionRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).json({ message: err.message });
});

export default app;
