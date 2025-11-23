import type { Request, Response } from "express";
import { ZodError } from "zod";
import { accountDTO } from "../dto/accountDTO.js";
import {
  createAccountService,
  deleteAccountService,
  getAccountByIdService,
  getAllAccountsService,
  updateAccountService,
} from "../services/accountService.js";

const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;

    const accounts = await getAllAccountsService(userId);

    res.status(200).send({
      message: "Contas listadas com sucesso.",
      data: accounts,
    });
  } catch (error) {
    res.status(500).send({ message: "Erro ao listar contas.", erro: error });
  }
};

const getAccountById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId!;
    const accountId = req.params.accountId!;

    const account = await getAccountByIdService(accountId, userId);

    if (!account) {
      return res
        .status(404)
        .send({ message: "Conta não encontrada ou acesso negado." });
    }

    res.status(200).send({
      message: "Conta encontrada com sucesso.",
      data: account,
    });
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar conta.", erro: error });
  }
};

const createAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;

    const validatedData = accountDTO.parse(req.body);

    const newAccount = await createAccountService(validatedData, userId);

    res.status(201).send({
      message: "Conta criada com sucesso.",
      data: newAccount,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .send({ message: "Dados de entrada inválidos.", errors: error.issues });
    }
    res.status(500).send({ message: "Erro ao criar conta.", erro: error });
  }
};

const updateAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const accountId = req.params.accountId as string;

    const validatedData = accountDTO.parse(req.body);

    if (Object.keys(validatedData).length === 0) {
      return res
        .status(400)
        .send({ message: "Nenhum dado fornecido para atualização." });
    }

    const verifyAccountExist = await getAccountByIdService(accountId, userId);

    if (!verifyAccountExist) {
      return res.status(404).send({
        message: "Account not found",
      });
    }

    const result = await updateAccountService(accountId, userId, validatedData);

    if (!result || result.length === 0) {
      return res
        .status(404)
        .send({ message: "Conta não encontrada ou acesso negado." });
    }

    res
      .status(200)
      .send({ message: "Conta atualizada com sucesso.", data: result[0] });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .send({ message: "Dados de entrada inválidos.", errors: error.issues });
    }
    res.status(500).send({ message: "Erro ao atualizar conta.", erro: error });
  }
};

const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const accountId = req.params.accountId as string;

    const verifyAccountExist = await getAccountByIdService(accountId, userId);

    if (!verifyAccountExist) {
      return res.status(404).send({
        message: "Account not found",
      });
    }

    await deleteAccountService(accountId);

    res.status(200).send({
      message: "Conta e transações relacionadas deletadas com sucesso.",
    });
  } catch (error: any) {
    if (error.message.includes("acesso negado")) {
      return res
        .status(404)
        .send({ message: "Conta não encontrada ou acesso negado." });
    }
    res.status(500).send({ message: "Erro ao deletar conta.", erro: error });
  }
};

export {
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccounts,
  updateAccount,
};
