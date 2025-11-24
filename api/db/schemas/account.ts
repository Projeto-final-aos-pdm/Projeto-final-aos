import { relations } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { transactionTable } from "./transaction.js";
import { userTable } from "./user.js";

export const accountTypeValues = [
  "checking",
  "savings",
  "salary",
  "investment",
  "digital",
] as const;

export const accountTypeEnum = pgEnum("accountType", accountTypeValues);
export type AccountTypeValues = (typeof accountTypeValues)[number];

export const accountTable = pgTable("Account", {
  id: uuid("id").defaultRandom().primaryKey(),

  balance: numeric("balance").default("0.00").notNull(),
  is_active: boolean("is_active").default(true).notNull(),

  bank: varchar("bank", { length: 100 }).notNull(),
  type: accountTypeEnum("type").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),

  user_id: uuid("user_id")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const accountRelations = relations(accountTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [accountTable.user_id],
    references: [userTable.id],
  }),
  transactions: many(transactionTable),
}));
