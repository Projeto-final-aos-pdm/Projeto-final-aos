import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { userDTO } from "../dto/userDTO.js";
import {
  createUserService,
  deleteUserByIdService,
  getAccountByIdAndUserIdService,
  getAllAccountsByUserIdService,
  getAllFinancialGoalsByUserIdService,
  getAllMonthlyBudgetByUserIdService,
  getAllUsersService,
  getFinancialGoalByIdAndUserIdService,
  getMonthlyBudgetByIdAndUserIdService,
  getUserByIdService,
  updateUserByIdService,
} from "../services/userService.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userList = await getAllUsersService();

    res.status(200).send({
      message: "Requet sucessfully",
      data: userList,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const userData = await getUserByIdService(userId);

    if (!userData) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send({
      message: "Request sucessfuly, user found!!",
      data: userData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const parsedData = userDTO.parse(req.body);

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const userDataWithHash = {
      ...parsedData,
      password: hashedPassword,
    };

    const userData = await createUserService(userDataWithHash);

    res.status(201).send({
      message: "Request sucessfully, created user",
      data: userData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const verifyExistUserData = await getUserByIdService(userId);

    if (!verifyExistUserData) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const parsedData = userDTO.partial().parse(req.body);

    let updateData = { ...parsedData };

    if (parsedData.password !== undefined) {
      const hashedPassword = await bcrypt.hash(parsedData.password, 10);
      updateData = {
        ...updateData,
        password: hashedPassword,
      };
    }

    const userData = await updateUserByIdService(userId, parsedData);

    res.status(200).send({
      message: "User updated sucessfully",
      data: userData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const verifyExistUserData = await getUserByIdService(userId);

    if (!verifyExistUserData) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    await deleteUserByIdService(userId);

    res.status(200).send({
      message: "Delete user sucessfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getAllAccountsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const accountsList = await getAllAccountsByUserIdService(userId);

    res.status(200).send({
      message: "Requet sucessfully",
      data: accountsList,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getAccountByIdAndUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;
    const accountId = req.params.accountId!;

    const accountData = await getAccountByIdAndUserIdService(userId, accountId);

    if (!accountData) {
      return res.status(400).send({
        message: "Account not found",
      });
    }

    res.status(200).send({
      message: "Request sucessfully, account found",
      data: accountData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getAllFinancialGoalsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const financialGoalList = await getAllFinancialGoalsByUserIdService(userId);

    res.status(200).send({
      message: "Request sucessfully, financial goal found",
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

const getFinancialGoalByIdAndUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;
    const financialGoalId = req.params.financialGoalId!;

    const financialGoalData = await getFinancialGoalByIdAndUserIdService(
      userId,
      financialGoalId
    );

    res.status(200).send({
      message: "Request sucessfully, financial goal found",
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

const getAllMonthlyBudgetByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const monthlyBudgetList = await getAllMonthlyBudgetByUserIdService(userId);

    res.status(200).send({
      message: "Request sucessfully, monthly budget found",
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

const getMonthlyBudgetByIdAndUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;
    const monthlyBudgetId = req.params.monthlyBudgetId!;

    const monthlyBudgetData = await getMonthlyBudgetByIdAndUserIdService(
      userId,
      monthlyBudgetId
    );

    res.status(200).send({
      message: "Request sucessfully, monthly budget found",
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

export {
  createUser,
  deleteUserById,
  getAccountByIdAndUserId,
  getAllAccountsByUserId,
  getAllFinancialGoalsByUserId,
  getAllMonthlyBudgetByUserId,
  getAllUsers,
  getFinancialGoalByIdAndUserId,
  getMonthlyBudgetByIdAndUserId,
  getUserById,
  updateUserById,
};
