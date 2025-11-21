import type { Request, Response } from "express";
import { transactionDTO } from "../dto/transationDTO";
import {
  createTransactionService,
  deleteTransactionByIdService,
  getAllTransactionsService,
  getTransactionByIdService,
  updateTransactionByIdService,
} from "../services/transactionService";

const getAllTransaction = async (req: Request, res: Response) => {
  try {
    const transactionList = await getAllTransactionsService();

    res.status(200).send({
      message: "Requet sucessfully",
      data: transactionList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).send({
        message: "Please insert transactionId",
      });
    }

    const transactionData = await getTransactionByIdService(transactionId);

    if (!transactionData) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send({
      message: "Request sucessfuly, transaction found!!",
      data: transactionData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const parsedData = transactionDTO.parse(req.body);

    const transactionData = createTransactionService(parsedData);

    if (!transactionData) {
      return res.status(404).send({
        message: "Transaction not found",
      });
    }

    res.status(201).send({
      message: "Request sucessfully, created transaction",
      data: transactionData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const updateTransactionById = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).send({
        message: "Please insert transactionId",
      });
    }

    

    const verifyTransactionExist = await getTransactionByIdService(
      transactionId
    );

    if (!verifyTransactionExist) {
      return res.status(404).send({
        message: "Transaction not found",
      });
    }

    const parsedData = transactionDTO.partial().parse(req.body);

    const transactionData = await updateTransactionByIdService(
      transactionId,
      parsedData
    );

    res.status(200).send({
      message: "Transaction updated",
      data: transactionData,
    });

    await updateTransactionByIdService(transactionId, parsedData);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const deleteTransactionById = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).send({
        message: "Please insert transactionId",
      });
    }

    const verifyTransactionExist = await getTransactionByIdService(
      transactionId
    );

    if (!verifyTransactionExist) {
      return res.status(404).send({
        message: "Transaction not found",
      });
    }

    await deleteTransactionByIdService(transactionId);

    res.status(200).send({
      message: "Transaction delete sucessfully",
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
  createTransaction,
  deleteTransactionById,
  getAllTransaction,
  getTransactionById,
  updateTransactionById,
};
