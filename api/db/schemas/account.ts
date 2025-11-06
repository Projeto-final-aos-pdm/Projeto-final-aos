import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { transactionTable } from "./transaction";
import { userTable } from "./user";

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
  id: uuid().defaultRandom().primaryKey(),
  bank: varchar().notNull(),
  type: accountTypeEnum("type").notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .defaultNow()
    .$defaultFn(() => new Date()),
  user_id: uuid()
    .notNull()
    .references(() => userTable.id),
});

export const accountRelations = relations(accountTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [accountTable.user_id],
    references: [userTable.id],
  }),
  transactions: many(transactionTable),
}));
