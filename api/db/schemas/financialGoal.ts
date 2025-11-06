import { relations } from "drizzle-orm";
import {
    date,
    numeric,
    pgTable,
    timestamp,
    uuid, 
    varchar,
} from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const financialGoalTable = pgTable("FinancialGoal", {
    id: uuid('id').defaultRandom().primaryKey(),
    
    description: varchar('description', { length: 255 }).notNull(),
    target_value: numeric('target_value').notNull(),
    current_value: numeric('current_value').default("0").notNull(),
    deadline: date('deadline', { mode: "string" }).notNull(),
    
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
        .$onUpdate(() => new Date()),
        
    user_id: uuid('user_id')
        .notNull()
        .references(() => userTable.id),
});

export const financialGoalRelations = relations(
    financialGoalTable,
    ({ one }) => ({
        user: one(userTable, {
            fields: [financialGoalTable.user_id],
            references: [userTable.id],
        }),
    })
);