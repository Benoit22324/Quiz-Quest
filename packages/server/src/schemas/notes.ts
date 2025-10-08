import { pgTable, smallint, uuid } from "drizzle-orm/pg-core";
import { quizs, users } from "./";

export const notes = pgTable("notes", {
    id: uuid("id").defaultRandom().primaryKey(),
    note: smallint("note").notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    quizId: uuid("quiz_id").references(() => quizs.id, { onDelete: "cascade" }).notNull()
})