import type { Request, Response } from "express";
import { financialGoalDTO } from "../dto/financialGoalDTO.js";
import {
  createFinancialGoalService,
  deleteFinancialGoalService,
  getAllFinalcialGoalsService,
  getFinancialGoalByIdService,
  updateFinancialGoalByIdService,
} from "../services/financialGoalService.js";

const getAllFinancialGoal = async (req: Request, res: Response) => {
  try {
    const financialGoalList = await getAllFinalcialGoalsService();

    res.status(200).send({
      message: "Request sucessfully",
      data: financialGoalList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getFinancialGoalById = async (req: Request, res: Response) => {
  try {
    const financialGoalId = req.params.financialGoalId!;

    const financialGoalData = await getFinancialGoalByIdService(
      financialGoalId
    );

    if (!financialGoalData) {
      return res.status(404).send({
        message: "Financial Goal not found",
      });
    }

    res.status(200).send({
      message: "Request sucessfully, financialGoal found",
      data: financialGoalData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const createFinancialGoal = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const parsedData = financialGoalDTO.parse(req.body);

    const financialGoalData = await createFinancialGoalService(
      parsedData,
      userId
    );

    res.status(201).send({
      message: "Request sucessfully, financial goal created",
      data: financialGoalData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const updateFinancialGoalById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const financialGoalId = req.params.financialGoalId!;

    const verifyExistFinancialGoalData = await getFinancialGoalByIdService(
      financialGoalId
    );

    if (!verifyExistFinancialGoalData) {
      return res.status(404).send({
        message: "Financial Goal not found",
      });
    }
    const parsedData = financialGoalDTO.partial().parse(req.body);

    const financialGoalData = await updateFinancialGoalByIdService(
      financialGoalId,
      parsedData,
      userId
    );

    res.status(200).send({
      message: "Finan",
      data: financialGoalData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const deleteFinancialGoalById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;
    const financialGoalId = req.params.financialGoalId!;

    const verifyExistFinancialGoalData = await getFinancialGoalByIdService(
      financialGoalId
    );

    if (!verifyExistFinancialGoalData) {
      return res.status(404).send({
        message: "Financial Goal not found",
      });
    }

    await deleteFinancialGoalService(financialGoalId, userId);

    res.status(200).send({
      message: "Request sucessfully, financial goal deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

export {
  createFinancialGoal,
  deleteFinancialGoalById,
  getAllFinancialGoal,
  getFinancialGoalById,
  updateFinancialGoalById,
};
