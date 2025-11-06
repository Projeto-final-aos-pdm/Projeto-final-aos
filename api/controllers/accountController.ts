import type { Request, Response } from "express";
import { accountDTO } from "../dto/accountDTO.js";
import {
  createAccountService,
  deleteAccountByIdService,
  getAccountByIdService,
  getAllAccountsService,
  updateAccountByIdService,
} from "../services/accountService.js";

const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const accountList = await getAllAccountsService();

    res.status(200).send({
      message: "Request sucessfully",
      data: accountList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getAccountById = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    if (!accountId) {
      return res.status(400).send({
        message: "Prease insert accountId",
      });
    }

    const accountData = await getAccountByIdService(accountId);

    if (!accountData) {
      return res.status(404).send({
        message: "Account not found",
      });
    }

    res.status(200).send({
      message: "Request sucessfully, acoount found!!",
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

const createAccount = async (req: Request, res: Response) => {
  try {
    const parsedData = accountDTO.parse(req.body);

    const accountData = await createAccountService(parsedData);

    res.status(201).send({
      message: "Request sucessfully, created account!!",
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

const updateAccountById = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    if (!accountId) {
      return res.status(400).send({
        message: "Prease insert accountId",
      });
    }
    const verifyExistAccountData = await getAccountByIdService(accountId);

    if (!verifyExistAccountData) {
      return res.status(404).send({
        message: "Account not found",
      });
    }

    const parsedData = accountDTO.partial().parse(req.body);

    await updateAccountByIdService(accountId, parsedData);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const deleteAccountById = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    if (!accountId) {
      return res.status(400).send({
        message: "Prease insert accountId",
      });
    }

    const verifyExistAccountData = await getAccountByIdService(accountId);

    if (!verifyExistAccountData) {
      return res.status(404).send({
        message: "Account not found",
      });
    }

    await deleteAccountByIdService(accountId);

    res.status(200).send({
      message: "Request sucessfully, account delete",
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
  createAccount,
  deleteAccountById,
  getAccountById,
  getAllAccounts,
  updateAccountById,
};
