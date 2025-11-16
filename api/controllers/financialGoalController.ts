import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { financialGoalDTO } from "../dto/financialGoalDTO.js";
import {
    createFinancialGoalService,
    deleteFinancialGoalService,
    getAllFinancialGoalsService,
    getFinancialGoalByIdService,
    updateFinancialGoalByIdService,
} from "../services/financialGoalService.js";

// Middleware de erro centralizado (adicione no app.ts após as rotas)
export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);

    if (error instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.errors,
        });
    }

    res.status(500).json({
        message: "Internal server error",
    });
};

// Função auxiliar para verificar existência
const checkFinancialGoalExists = async (
    financialGoalId: string,
    res: Response
) => {
    const financialGoal = await getFinancialGoalByIdService(financialGoalId);

    if (!financialGoal) {
        res.status(404).json({
            message: "Financial goal not found",
        });
        return null;
    }

    return financialGoal;
};

const getAllFinancialGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const financialGoalList = await getAllFinancialGoalsService();

        res.status(200).json({
            message: "Request successful",
            data: financialGoalList,
        });
    } catch (error) {
        next(error);
    }
};

const getFinancialGoalById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { financialGoalId } = req.params;

        if (!financialGoalId) {
            return res.status(400).json({
                message: "Financial goal ID is required",
            });
        }

        const financialGoalData = await checkFinancialGoalExists(financialGoalId, res);
        if (!financialGoalData) return;

        res.status(200).json({
            message: "Request successful",
            data: financialGoalData,
        });
    } catch (error) {
        next(error);
    }
};

const createFinancialGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = financialGoalDTO.parse(req.body);
        const financialGoalData = await createFinancialGoalService(parsedData);

        res.status(201).json({
            message: "Financial goal created successfully",
            data: financialGoalData,
        });
    } catch (error) {
        next(error);
    }
};

const updateFinancialGoalById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { financialGoalId } = req.params;

        if (!financialGoalId) {
            return res.status(400).json({
                message: "Financial goal ID is required",
            });
        }

        const exists = await checkFinancialGoalExists(financialGoalId, res);
        if (!exists) return;

        const parsedData = financialGoalDTO.partial().parse(req.body);
        const updatedGoal = await updateFinancialGoalByIdService(financialGoalId, parsedData);

        res.status(200).json({
            message: "Financial goal updated successfully",
            data: updatedGoal,
        });
    } catch (error) {
        next(error);
    }
};

const deleteFinancialGoalById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { financialGoalId } = req.params;

        if (!financialGoalId) {
            return res.status(400).json({
                message: "Financial goal ID is required",
            });
        }

        const exists = await checkFinancialGoalExists(financialGoalId, res);
        if (!exists) return;

        await deleteFinancialGoalService(financialGoalId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export {
    createFinancialGoal,
    deleteFinancialGoalById,
    getAllFinancialGoal,
    getFinancialGoalById,
    updateFinancialGoalById,
};