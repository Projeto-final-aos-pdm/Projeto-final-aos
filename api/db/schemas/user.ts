import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import { accountTable } from "./account";
import { financialGoalTable } from "./financialGoal";
import { monthlyBudgetTable } from "./monthlyBudget";

export const userTable = pgTable("User", {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
        .$onUpdate(() => new Date()),
});

export const userRelations = relations(userTable, ({ many }) => ({
    account: many(accountTable),
    monthlyBugdget: many(monthlyBudgetTable),
    financialGoal: many(financialGoalTable),
}));