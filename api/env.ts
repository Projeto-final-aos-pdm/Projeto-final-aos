import { z } from "zod";

export const envSchema = z.object({
  PORT: z.number().default(3333),
  DATABASE_URL: z.string().nonempty(),
  SECRET_KEY: z.string().nonempty(),
});

const env = envSchema.parse(process.env);

export default env;
