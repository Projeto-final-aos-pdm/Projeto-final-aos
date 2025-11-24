import { and, eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { accountTable } from "../db/schemas/account.js";
import { transactionTable } from "../db/schemas/transaction.js";
import type { AccountDTO } from "../dto/accountDTO.js";

const getAllAccountsService = async () => {
  return await database.query.accountTable.findMany();
};

const getAccountByIdService = async (accountId: string) => {
  return await database.query.accountTable.findFirst({
    where: eq(accountTable.id, accountId),
  });
};

const createAccountService = async (data: AccountDTO, userId: string) => {
  return await database
    .insert(accountTable)
    .values({
      ...data,
      user_id: userId,
    })
    .returning();
};

const updateAccountService = async (
  accountId: string,
  userId: string,
  data: Partial<AccountDTO>
) => {
  return await database
    .update(accountTable)
    .set(data)
    .where(
      and(eq(accountTable.id, accountId), eq(accountTable.user_id, userId))
    )
    .returning();
};

const deleteAccountService = async (accountId: string) => {
  return await database
    .delete(accountTable)
    .where(eq(accountTable.id, accountId));
};

const getAllTransactionsByAccountService = async (accountId: string) => {
  return await database.query.transactionTable.findMany({
    where: eq(transactionTable.account_id, accountId),
  });
};

export {
  createAccountService,
  deleteAccountService,
  getAccountByIdService,
  getAllAccountsService,
  getAllTransactionsByAccountService,
  updateAccountService,
};
