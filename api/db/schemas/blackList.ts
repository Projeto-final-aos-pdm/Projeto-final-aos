import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const blackListTable = pgTable("blackList", {
  id: uuid().defaultRandom().primaryKey(),
  token: varchar().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});
