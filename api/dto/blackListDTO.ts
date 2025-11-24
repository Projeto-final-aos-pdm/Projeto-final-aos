import z from "zod";

export const blackListDTO = z.object({
  token: z.string().nonempty(),
});

export type BlackListDTO = z.infer<typeof blackListDTO>;
