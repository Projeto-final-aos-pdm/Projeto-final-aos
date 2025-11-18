import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken"; 

const JWT_SECRET: string = process.env.JWT_SECRET || "nossa_chave_secreta_padrao";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: "Acesso negado: Token não fornecido ou formato inválido." });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Acesso negado: Token malformado." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
            
            req.userId = decoded.userId as string; 
            
            next();
        } else {
            throw new Error("Token em formato inesperado.");
        }

    } catch (error) {
        return res.status(401).send({ message: "Acesso negado: Token inválido ou expirado." });
    }
};