import { relations } from "drizzle-orm";
import {
    date,
    numeric,
    pgEnum,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { accountTable } from "./account";
import { categoryTable } from "./category";

export const transactionType = ["income", "expense"] as const;
export const transactionTypeEnum = pgEnum(
    "transactionTypeEnum",
    transactionType
);
export type TransactionType = (typeof transactionType)[number];

export const transactionTable = pgTable("Transaction", {
    id: uuid('id').defaultRandom().primaryKey(),
    
    type: transactionTypeEnum('type').notNull(),
    value: numeric('value').notNull(),
    date: date('date', { mode: "string" }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
        .$onUpdate(() => new Date()),
        
    account_id: uuid('account_id')
        .notNull()
        .references(() => accountTable.id),
    category_id: uuid('category_id')
        .notNull()
        .references(() => categoryTable.id),
});

export const transactionRelations = relations(transactionTable, ({ one }) => ({
    account: one(accountTable, {
        fields: [transactionTable.account_id],
        references: [accountTable.id],
    }),
    category: one(categoryTable, {
        fields: [transactionTable.category_id],
        references: [categoryTable.id],
    }),
}));