import { and, eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { accountTable } from "../db/schemas/account.js";
import { financialGoalTable } from "../db/schemas/financialGoal.js";
import { monthlyBudgetTable } from "../db/schemas/monthlyBudget.js";
import { userTable } from "../db/schemas/user.js";
import type { AuthenticationDTO } from "../dto/authenticationDTO.js";
import type { UserDTO } from "../dto/userDTO.js";

const getAllUsersService = async () => {
  return await database.query.userTable.findMany();
};

const getUserByIdService = async (userId: string) => {
  return await database.query.userTable.findFirst({
    where: eq(userTable.id, userId),
  });
};

const getUserByEmail = async (data: AuthenticationDTO) => {
  return await database.query.userTable.findFirst({
    where: eq(userTable.email, data.email),
  });
};

const createUserService = async (data: UserDTO) => {
  return await database.insert(userTable).values(data).returning();
};

const updateUserByIdService = async (
  userId: string,
  data: Partial<UserDTO>
) => {
  return await database
    .update(userTable)
    .set(data)
    .where(eq(userTable.id, userId));
};

const deleteUserByIdService = async (userId: string) => {
  return await database.delete(userTable).where(eq(userTable.id, userId));
};

const getAllMonthlyBudgetByUserIdService = async (userId: string) => {
  return database.query.monthlyBudgetTable.findMany({
    where: eq(monthlyBudgetTable.user_id, userId),
  });
};

const getMonthlyBudgetByIdAndUserIdService = async (
  userId: string,
  monthlyBudgetId: string
) => {
  return database.query.monthlyBudgetTable.findFirst({
    where: and(
      eq(monthlyBudgetTable.id, monthlyBudgetId),
      eq(monthlyBudgetTable.user_id, userId)
    ),
  });
};

const getAllFinancialGoalsByUserIdService = async (userId: string) => {
  return database.query.financialGoalTable.findMany({
    where: eq(financialGoalTable.user_id, userId),
  });
};

const getFinancialGoalByIdAndUserIdService = async (
  userId: string,
  financialGoalId: string
) => {
  return database.query.financialGoalTable.findFirst({
    where: and(
      eq(financialGoalTable.id, financialGoalId),
      eq(financialGoalTable.user_id, userId)
    ),
  });
};

const getAllAccountsByUserIdService = async (userId: string) => {
  return database.query.accountTable.findMany({
    where: eq(accountTable.user_id, userId),
  });
};

const getAccountByIdAndUserIdService = async (
  userId: string,
  accountId: string
) => {
  return database.query.accountTable.findFirst({
    where: and(
      eq(accountTable.id, accountId),
      eq(accountTable.user_id, userId)
    ),
  });
};

export {
  createUserService,
  deleteUserByIdService,
  getAccountByIdAndUserIdService,
  getAllAccountsByUserIdService,
  getAllFinancialGoalsByUserIdService,
  getAllMonthlyBudgetByUserIdService,
  getAllUsersService,
  getFinancialGoalByIdAndUserIdService,
  getMonthlyBudgetByIdAndUserIdService,
  getUserByEmail,
  getUserByIdService,
  updateUserByIdService,
};
