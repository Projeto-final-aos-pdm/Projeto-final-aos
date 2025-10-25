import { relations } from "drizzle-orm";
import {
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const monthlyBudgetTable = pgTable("MonthlyBudget", {
  id: uuid().defaultRandom().primaryKey(),
  month: varchar({ length: 15 }).notNull(),
  year: numeric().notNull(),
  limit_value: numeric().notNull(),
  spent_value: numeric().default("0").notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  user_id: uuid()
    .notNull()
    .references(() => userTable.id),
});

export const monthlyBudgetRelations = relations(
  monthlyBudgetTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [monthlyBudgetTable.user_id],
      references: [userTable.id],
    }),
  })
);
