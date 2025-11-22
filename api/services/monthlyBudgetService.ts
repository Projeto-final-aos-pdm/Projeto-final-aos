import { eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { monthlyBudgetTable } from "../db/schemas/monthlyBudget.js";
import type { MonthlyBudgetDTO } from "../dto/monthlyBudgetDTO.js";

const getAllMonthlyBudgetService = async () => {
  return await database.query.monthlyBudgetTable.findMany();
};

const getMonthlyBudgetByIdService = async (monthlyBudgetId: string) => {
  return await database.query.monthlyBudgetTable.findFirst({
    where: eq(monthlyBudgetTable.id, monthlyBudgetId),
  });
};

const createMonthlyBudgetService = async (data: MonthlyBudgetDTO) => {
  return await database.insert(monthlyBudgetTable).values(data).returning();
};

const updateMonthlyBudgetService = async (
  monthlyBudgetId: string,
  data: Partial<MonthlyBudgetDTO>
) => {
  return await database
    .update(monthlyBudgetTable)
    .set(data)
    .where(eq(monthlyBudgetTable.id, monthlyBudgetId))
    .returning();
};

const deleteMonthlyBudgetService = async (monthlyBudgetId: string) => {
  return database
    .delete(monthlyBudgetTable)
    .where(eq(monthlyBudgetTable.id, monthlyBudgetId));
};

export {
  createMonthlyBudgetService,
  deleteMonthlyBudgetService,
  getAllMonthlyBudgetService,
  getMonthlyBudgetByIdService,
  updateMonthlyBudgetService,
};
