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

export const financialGoalTable = pgTable("Financial_Goal", {
  id: uuid().defaultRandom().primaryKey(),
  description: varchar({ length: 255 }).notNull(),
  target_value: numeric().notNull(),
  current_value: numeric().default("0").notNull(),
  deadline: date({ mode: "date" }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  user_id: uuid()
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
