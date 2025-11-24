import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import env from "../env.js";
import { getTokenByJWTTokenService } from "../services/blackListService.js";

const SECRET_KEY: string = env.SECRET_KEY || "nossa_chave_secreta_padrao";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Acesso negado: Token não fornecido ou formato inválido.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Acesso negado: Token mal formado." });
  }

  const verifyBlackList = await getTokenByJWTTokenService(token);

  if (verifyBlackList) {
    return res
      .status(401)
      .send({ message: "Acesso negado: Token inválido ou expirado." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded
    ) {
      req.userId = decoded.userId as string;

      next();
    } else {
      throw new Error("Token em formato inesperado.");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ message: "Acesso negado: Token inválido ou expirado." });
  }
};
