import z from "zod";
import { monthType } from "../db/schemas/index.js";

export const monthlyBudgetDTO = z.object({
  month: z.enum(monthType),
  year: z.string().nonempty(),
  limit_value: z.string().nonempty(),
  spent_value: z.string().default("0"),
  user_id: z.string().uuid(),
});

export type MonthlyBudgetDTO = z.infer<typeof monthlyBudgetDTO>;
