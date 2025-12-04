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
import { accountTable } from "./account.js";
import { categoryTable } from "./category.js";

export const transactionType = ["income", "expense"] as const;
export const transactionTypeEnum = pgEnum(
  "transactionTypeEnum",
  transactionType
);
export type TransactionType = (typeof transactionType)[number];

export const transactionTable = pgTable("Transaction", {
  id: uuid().defaultRandom().primaryKey(),
  type: transactionTypeEnum().notNull(),
  value: numeric().notNull(),
  date: date({ mode: "date" }).notNull(),
  description: varchar().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .defaultNow()
    .$defaultFn(() => new Date()),
  account_id: uuid()
    .notNull()
    .references(() => accountTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  category_id: uuid()
    .notNull()
    .references(() => categoryTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
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
