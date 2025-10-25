import { drizzle } from "drizzle-orm/postgres-js";
import env from "../env.js";
import * as entitySchemas from "./schemas/index.js";

export const database = drizzle(env.DATABASE_URL, {
  schema: entitySchemas,
});
