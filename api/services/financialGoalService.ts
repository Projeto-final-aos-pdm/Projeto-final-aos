import { and, eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { financialGoalTable } from "../db/schemas/financialGoal.js";
import type { FinancialGoalDTO } from "../dto/financialGoalDTO.js";

const getAllFinalcialGoalsService = async (userId: string) => {
  return await database.query.financialGoalTable.findMany({
    where: eq(financialGoalTable.user_id, userId),
  });
};

const getFinancialGoalByIdService = async (
  financialGoalId: string,
  userId: string
) => {
  return await database.query.financialGoalTable.findFirst({
    where: and(
      eq(financialGoalTable.id, financialGoalId),
      eq(financialGoalTable.user_id, userId)
    ),
  });
};

const createFinancialGoalService = async (
  data: FinancialGoalDTO,
  userId: string
) => {
  return await database
    .insert(financialGoalTable)
    .values({ ...data, user_id: userId })
    .returning();
};

const updateFinancialGoalByIdService = async (
  financialGoalId: string,
  data: Partial<FinancialGoalDTO>,
  userId: string
) => {
  return await database
    .update(financialGoalTable)
    .set({ ...data, user_id: userId })
    .where(
      and(
        eq(financialGoalTable.id, financialGoalId),
        eq(financialGoalTable.user_id, userId)
      )
    )
    .returning();
};

const deleteFinancialGoalService = async (
  financialGoalId: string,
  userId: string
) => {
  return await database
    .delete(financialGoalTable)
    .where(eq(financialGoalTable.id, financialGoalId));
};

export {
  createFinancialGoalService,
  deleteFinancialGoalService,
  getAllFinalcialGoalsService,
  getFinancialGoalByIdService,
  updateFinancialGoalByIdService,
};
