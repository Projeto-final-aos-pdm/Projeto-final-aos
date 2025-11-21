import z from "zod";
import { transactionType } from "../db/schemas";

export const transactionDTO = z.object({
  type: z.enum(transactionType),
  value: z.string().nonempty(),
  date: z.coerce.date(),
  description: z.string().nonempty(),
  account_id: z.string().uuid().nonempty(),
  category_id: z.string().uuid().nonempty(),
});

export type TransactionDTO = z.infer<typeof transactionDTO>;
