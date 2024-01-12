// Importe as bibliotecas necessárias
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

// Defina a chave secreta
const secret = process.env.JWT_SECRET as string;

// Crie a lista negra de tokens
const blacklistedTokens = new Set();

// Função para adicionar tokens à lista negra
const addToBlacklist = (token: string) => {
  blacklistedTokens.add(token);
};

// Função para verificar se um token está na lista negra
const isTokenBlacklisted = (token: string) => {
  return blacklistedTokens.has(token);
};

// Função para gerar um novo token JWT
const sign = (payload: { id: number; username: string }) => {
  const jwtConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "12h",
  };

  return jwt.sign(payload, secret, jwtConfig);
};

// Middleware para verificar o token em requisições
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Não autorizado" });

    // Configurações para verificar o token
    const jwtVerifyOptions: VerifyOptions = {
      algorithms: ["HS256"],
    };

    // Verifique se o token está na lista negra antes de prosseguir
    if (isTokenBlacklisted(token)) {
      return res.status(401).json({ message: "Token Revogado" });
    }

    // Verifique o token
    const decoded = jwt.verify(token, secret, jwtVerifyOptions);
    res.locals.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

// Exporte as funções e middleware necessários
export { sign, verifyToken, addToBlacklist, isTokenBlacklisted };
