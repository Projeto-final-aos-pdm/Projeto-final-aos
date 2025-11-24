import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { accountTable } from "./account.js";
import { financialGoalTable } from "./financialGoal.js";
import { monthlyBudgetTable } from "./monthlyBudget.js";

export const userTable = pgTable("User", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  email: varchar().unique().notNull(),
  password: varchar().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(userTable, ({ many }) => ({
  account: many(accountTable),
  monthlyBugdget: many(monthlyBudgetTable),
  financialGoal: many(financialGoalTable),
}));
