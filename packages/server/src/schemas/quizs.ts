import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./";

export const quizs = pgTable("quizs", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    difficulty: varchar("difficulty", { length: 255 }).notNull(),
    authorId: uuid("author_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").defaultNow()
})