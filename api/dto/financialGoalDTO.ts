import z from "zod";

export const financialGoalDTO = z.object({
  description: z.string().nonempty(),
  target_value: z.coerce
    .number()
    .positive("The target value must be bigger 0")
    .transform(String),
  current_value: z.coerce
    .number()
    .min(0, "The current value cannot be negative")
    .default(0)
    .transform(String),
  deadline: z.coerce
    .date()
    .min(new Date(), "The deadline must be in the future"),
});

export type FinancialGoalDTO = z.infer<typeof financialGoalDTO>;
