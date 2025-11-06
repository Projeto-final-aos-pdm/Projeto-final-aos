import z from "zod";
import { accountTypeValues } from "../db/schemas/account.js";

export const accountDTO = z.object({
  bank: z.string().nonempty(),
  type: z.enum(accountTypeValues),
  user_id: z.uuid(),
});

export type AccountDTO = z.infer<typeof accountDTO>;
