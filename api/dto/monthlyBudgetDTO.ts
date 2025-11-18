import z from "zod";

export const monthlyBudgetDTO = z.object({
    month: z.string().nonempty("Month is required"),
    year: z.coerce.number().int().positive("Year must be a positive integer"),
    limit_value: z.coerce.number().positive("Limit value must be greater than 0").transform(String),
    spent_value: z.coerce.number().min(0, "Spent value cannot be negative").default(0).transform(String),
    user_id: z.string().uuid("Invalid user ID format"),
});

export type MonthlyBudgetDTO = z.infer<typeof monthlyBudgetDTO>;
