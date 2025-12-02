import z from "zod";

export const jwtDTO = z.object({
  userId: z.string(),
  userEmail: z.string(),
});

export type JwtDTO = z.infer<typeof jwtDTO>;
