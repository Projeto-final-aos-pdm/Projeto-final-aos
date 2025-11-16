import { eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { financialGoalTable } from "../db/schemas/financialGoal.js";
import type { FinancialGoalDTO } from "../dto/financialGoalDTO.js";

const getAllFinancialGoalsService = async () => {
  return await database.query.financialGoalTable.findMany();
};

const getFinancialGoalByIdService = async (financialGoalId: string) => {
  return await database.query.financialGoalTable.findFirst({
    where: eq(financialGoalTable.id, financialGoalId),
  });
};

const createFinancialGoalService = async (data: FinancialGoalDTO) => {
  return await database.insert(financialGoalTable).values(data).returning();
};

const updateFinancialGoalByIdService = async (
  financialGoalId: string,
  data: Partial<FinancialGoalDTO>
) => {
  return await database
    .update(financialGoalTable)
    .set(data)
    .where(eq(financialGoalTable.id, financialGoalId))
    .returning();
};

const deleteFinancialGoalService = async (financialGoalId: string) => {
  return await database
    .delete(financialGoalTable)
    .where(eq(financialGoalTable.id, financialGoalId));
};

export {
  createFinancialGoalService,
  deleteFinancialGoalService,
  getAllFinancialGoalsService,
  getFinancialGoalByIdService,
  updateFinancialGoalByIdService,
};
