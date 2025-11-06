import { relations } from "drizzle-orm";
import {
    numeric,
    pgTable,
    timestamp,
    uuid,
    varchar,
    integer,
} from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const monthlyBudgetTable = pgTable("MonthlyBudget", {
    id: uuid('id').defaultRandom().primaryKey(),
    month: varchar('month', { length: 15 }).notNull(),
    year: integer('year').notNull(),
    limit_value: numeric('limit_value').notNull(),
    spent_value: numeric('spent_value').default("0").notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
        .$onUpdate(() => new Date()),
    user_id: uuid('user_id')
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