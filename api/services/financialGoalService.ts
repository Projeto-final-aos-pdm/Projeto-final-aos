import { and, eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { financialGoalTable } from "../db/schemas/financialGoal.js";
import type { FinancialGoalDTO } from "../dto/financialGoalDTO.js";

const getAllFinalcialGoalsService = async () => {
  return await database.query.financialGoalTable.findMany();
};

const getFinancialGoalByIdService = async (financialGoalId: string) => {
  return await database.query.financialGoalTable.findFirst({
    where: eq(financialGoalTable.id, financialGoalId),
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
