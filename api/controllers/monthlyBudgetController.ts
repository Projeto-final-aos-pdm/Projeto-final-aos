import type { Request, Response } from "express";
import { monthlyBudgetDTO } from "../dto/monthlyBudgetDTO.js";
import {
  createMonthlyBudgetService,
  deleteMonthlyBudgetService,
  getAllMonthlyBudgetService,
  getMonthlyBudgetByIdService,
  updateMonthlyBudgetService,
} from "../services/monthlyBudgetService.js";

const getAllMonthlyBudget = async (req: Request, res: Response) => {
  try {
    const monthlyBudgetList = await getAllMonthlyBudgetService();

    res.status(200).send({
      message: "Requet sucessfully",
      data: monthlyBudgetList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getMonthlyBudgetById = async (req: Request, res: Response) => {
  try {
    const monthlyBudgetId = req.params.monthlyBudgetId!;

    const monthlyBudgetData = await getMonthlyBudgetByIdService(
      monthlyBudgetId
    );

    if (!monthlyBudgetData) {
      return res.status(404).send({
        message: "monthlyBudget not found",
      });
    }

    res.status(200).send({
      message: "Request sucessfuly, monthly Budget found!!",
      data: monthlyBudgetData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const createMonthlyBudget = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const parsedData = monthlyBudgetDTO.parse(req.body);

    const MonthlyBudgetData = await createMonthlyBudgetService(
      parsedData,
      userId
    );

    res.status(201).send({
      message: "Request sucessfully, created MonthlyBudget",
      data: MonthlyBudgetData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const updateMonthlyBudget = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const monthlyBudgetId = req.params.monthlyBudgetId!;

    const VerifymonthlyBudgetExist = await getMonthlyBudgetByIdService(
      monthlyBudgetId
    );

    if (!VerifymonthlyBudgetExist) {
      return res.status(404).send({
        message: "monthlyBudget not found",
      });
    }

    const parsedData = monthlyBudgetDTO.partial().parse(req.body);

    const MonthlyBudgetData = await updateMonthlyBudgetService(
      monthlyBudgetId,
      parsedData,
      userId
    );

    res.status(200).send({
      message: "Request sucessfully, created MonthlyBudget",
      data: MonthlyBudgetData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const deleteMonthlyBudget = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const monthlyBudgetId = req.params.monthlyBudgetId!;

    const VerifymonthlyBudgetExist = await getMonthlyBudgetByIdService(
      monthlyBudgetId
    );

    if (!VerifymonthlyBudgetExist) {
      return res.status(404).send({
        message: "monthlyBudget not found",
      });
    }

    await deleteMonthlyBudgetService(monthlyBudgetId);

    res.status(200).send({
      message: "MonthlyBudget delete sucessfully",
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
  createMonthlyBudget,
  deleteMonthlyBudget,
  getAllMonthlyBudget,
  getMonthlyBudgetById,
  updateMonthlyBudget,
};
