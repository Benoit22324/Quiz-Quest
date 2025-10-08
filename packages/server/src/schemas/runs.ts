import { pgTable, smallint, timestamp, uuid } from "drizzle-orm/pg-core";
import { users, quizs } from "./";

export const runs = pgTable("runs", {
    id: uuid("id").defaultRandom().primaryKey(),
    result: smallint("result").notNull(),
    quizId: uuid("quiz_id").references(() => quizs.id, { onDelete: "cascade" }).notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").defaultNow()
})