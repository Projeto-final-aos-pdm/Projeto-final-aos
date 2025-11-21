import z from "zod";

export const authenticationDTO = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export type AuthenticationDTO = z.infer<typeof authenticationDTO>;
