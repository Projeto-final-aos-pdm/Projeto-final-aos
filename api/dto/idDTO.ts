import z from "zod";

export const idDTO = z.object({
  id: z.string().uuid(),
});

export type IdDTO = z.infer<typeof idDTO>;
