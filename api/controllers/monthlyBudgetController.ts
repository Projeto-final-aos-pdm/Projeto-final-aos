import type { Request, Response } from "express";
import { monthlyBudgetDTO } from "../dto/monthlyBudgetDTO";
import {
  createMonthlyBudgetService,
  deleteMonthlyBudgetService,
  getAllMonthlyBudgetService,
  getMonthlyBudgetByIdService,
  updateMonthlyBudgetService,
} from "../services/monthlyBudgetService";

const getAllMonthlyBudget = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;

    const monthlyBudgetList = await getAllMonthlyBudgetService(userId);

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
    const userId = req.params.userId as string;

    const monthlyBudgetId = req.params.monthlyBudgetId as string;

    const monthlyBudgetData = await getMonthlyBudgetByIdService(
      monthlyBudgetId,
      userId
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
    const parsedData = monthlyBudgetDTO.parse(req.body);

    const MonthlyBudgetData = await createMonthlyBudgetService(parsedData);

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
    const { monthlyBudgetId } = req.params;

    if (!monthlyBudgetId) {
      return res.status(400).send({
        message: "Please insert monthlyBudgetId",
      });
    }

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
      parsedData
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
    const { monthlyBudgetId } = req.params;

    if (!monthlyBudgetId) {
      return res.status(400).send({
        message: "Please insert monthlyBudgetId",
      });
    }

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
