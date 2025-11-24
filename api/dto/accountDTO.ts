import z from "zod";
import { accountTypeValues } from "../db/schemas/index.js";

export const accountDTO = z.object({
  bank: z
    .string()
    .min(1, { message: "O nome do banco é obrigatório." })
    .max(100, {
      message: "O nome do banco deve ter no máximo 100 caracteres.",
    }),

  type: z.enum(accountTypeValues),

  balance: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Saldo deve ser um valor monetário válido (ex: '1000' ou '1000.50')."
    )
    .optional()
    .default("0.00"),

  is_active: z.boolean().optional().default(true),
});

export type AccountDTO = z.infer<typeof accountDTO>;
