import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import { transactionTable } from "./transaction";
import { userTable } from "./user";

export const categoryType = ["fixa", "variavel"] as const;
export const categoryTypeEnum = pgEnum(
    "categoryTypeEnum",
    categoryType
);
export type CategoryType = (typeof categoryType)[number];

export const categoryTable = pgTable("Category", {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id')
        .notNull()
        .references(() => userTable.id),
    name: varchar('name', { length: 100 }).notNull(),
    type: categoryTypeEnum('type').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
        .$onUpdate(() => new Date()),
});

export const categoryRelations = relations(categoryTable, ({ many, one }) => ({
    user: one(userTable, {
        fields: [categoryTable.user_id],
        references: [userTable.id],
    }),
    transactions: many(transactionTable),
}));