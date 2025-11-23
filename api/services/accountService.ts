import { and, eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { accountTable } from "../db/schemas/account.js";
import type { AccountDTO } from "../dto/accountDTO.js";

const getAllAccountsService = async (userId: string) => {
  return await database.query.accountTable.findMany({
    where: eq(accountTable.user_id, userId),
  });
};

const getAccountByIdService = async (accountId: string, userId: string) => {
  return await database.query.accountTable.findFirst({
    where: and(
      eq(accountTable.id, accountId),
      eq(accountTable.user_id, userId)
    ),
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

export {
  createAccountService,
  deleteAccountService,
  getAccountByIdService,
  getAllAccountsService,
  updateAccountService,
};
