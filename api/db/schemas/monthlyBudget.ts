import { relations } from "drizzle-orm";
import { numeric, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const monthType = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
export const monthEnum = pgEnum("monthlyBudgetEnum", monthType);
export type MonthType = (typeof monthType)[number];

export const monthlyBudgetTable = pgTable("MonthlyBudget", {
  id: uuid().defaultRandom().primaryKey(),
  month: monthEnum().notNull(),
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
