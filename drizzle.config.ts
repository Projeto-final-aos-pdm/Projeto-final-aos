import { defineConfig } from "drizzle-kit";
import env from "./api/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./api/db/schemas",
  out: "./api/db/drizzle",
  casing: "snake_case",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
