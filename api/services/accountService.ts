import { eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { accountTable } from "../db/schemas/account.js";
import type { AccountDTO } from "../dto/accountDTO.js";

const getAllAccountsService = async () => {
  return await database.query.accountTable.findMany();
};

const getAccountByIdService = async (accountId: string) => {
  return await database.query.accountTable.findFirst({
    where: eq(accountTable.id, accountId),
  });
};

const createAccountService = async (data: AccountDTO) => {
  return await database.insert(accountTable).values(data).returning();
};

const updateAccountByIdService = async (
  accountId: string,
  data: Partial<AccountDTO>
) => {
  return await database
    .update(accountTable)
    .set(data)
    .where(eq(accountTable.id, accountId))
    .returning();
};

const deleteAccountByIdService = async (accountId: string) => {
  return await database
    .delete(accountTable)
    .where(eq(accountTable.id, accountId));
};

export {
  createAccountService,
  deleteAccountByIdService,
  getAccountByIdService,
  getAllAccountsService,
  updateAccountByIdService,
};
