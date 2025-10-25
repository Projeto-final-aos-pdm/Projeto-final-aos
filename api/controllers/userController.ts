import type { Request, Response } from "express";
import {
    createUserService,
    deleteUserByIdService,
    getUserByIdService,
    updateUserByIdService,
} from "../services/userService.js";
import { userDTO } from "../dto/userDTO.js";
import { ZodError } from "zod";

const signUp = async (req: Request, res: Response) => {
    try {
        const validatedData = userDTO.parse(req.body);

        const newUser = await createUserService(validatedData);

        res.status(201).send({
            message: "Usuário criado com sucesso! Faça login para continuar.",
            data: newUser,
        });
    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.status(400).send({
                message: "Dados de entrada inválidos.",
                errors: error.issues,
            });
        }
        if (error.code === '23505') {
            return res.status(409).send({ message: "O e-mail fornecido já está em uso." });
        }

        res.status(500).send({
            message: "Erro interno do servidor ao criar usuário.",
            erro: error.message,
        });
    }
};

const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string;

        const userData = await getUserByIdService(userId);

        if (!userData) {
            return res.status(404).send({ message: "Perfil de usuário não encontrado." });
        }

        res.status(200).send({
            message: "Dados do perfil carregados com sucesso.",
            data: userData,
        });
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor ao buscar perfil.",
            erro: error,
        });
    }
};

const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string;
        const dataToUpdate = req.body; 

        await updateUserByIdService(userId, dataToUpdate);

        res.status(204).send();
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor ao atualizar perfil.",
            erro: error,
        });
    }
};

const deleteUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string;

        await deleteUserByIdService(userId);

        res.status(200).send({
            message: "Conta de usuário deletada com sucesso.",
        });
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor ao deletar conta.",
            erro: error,
        });
    }
};

export { signUp, getUserProfile, updateUserProfile, deleteUserProfile };