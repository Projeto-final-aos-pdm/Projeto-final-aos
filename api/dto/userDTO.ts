import z from "zod";

export const userDTO = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export type UserDTO = z.infer<typeof userDTO>;