import z from "zod";

export const financialGoalDTO = z.object({
    description: z.string().nonempty(),
    target_value: z.coerce.number().positive("The target valeu mut be bigger 0").transform(String),
    current_value: z.coerce.number().min(0, "The current value cannot be negative").default(0).transform(String),
    deadline: z.coerce.date().min(new Date, "The deadline must be in the future"),
    user_id: z.string().uuid()
})

export type FinancialGoalDTO = z.infer<typeof financialGoalDTO>