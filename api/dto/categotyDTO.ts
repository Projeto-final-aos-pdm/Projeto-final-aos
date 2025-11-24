import z from "zod";
import { categoryType } from "../db/schemas/index.js";

export const categoryDTO = z.object({
    name: z.string().nonempty(),
    type: z.enum(categoryType),
});

export type CategoryDTO = z.infer<typeof categoryDTO>;