import { eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { transactionTable } from "../db/schemas/transaction.js";
import type { TransactionDTO } from "../dto/transationDTO.js";

const getAllTransactionsService = async () => {
  return await database.query.transactionTable.findMany();
};

const getTransactionByIdService = async (transactionId: string) => {
  return await database.query.transactionTable.findFirst({
    where: eq(transactionTable.id, transactionId),
  });
};

const createTransactionService = async (data: TransactionDTO) => {
  return await database.insert(transactionTable).values(data).returning();
};

const updateTransactionByIdService = async (
  transactionId: string,
  data: Partial<TransactionDTO>
) => {
  return await database
    .update(transactionTable)
    .set(data)
    .where(eq(transactionTable.id, transactionId))
    .returning();
};

const deleteTransactionByIdService = async (transactionId: string) => {
  return await database
    .delete(transactionTable)
    .where(eq(transactionTable.id, transactionId));
};

export {
  createTransactionService,
  deleteTransactionByIdService,
  getAllTransactionsService,
  getTransactionByIdService,
  updateTransactionByIdService,
};
