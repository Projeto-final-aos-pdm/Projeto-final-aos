import type { NextFunction, Request, Response } from "express";

export const isOwnerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIdFromToken = req.userId as string;
  const { userId } = req.params;

  if (userIdFromToken !== userId) {
    return res.status(403).send({ message: "Acesso negado." });
  }

  return next();
};
