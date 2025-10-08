import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users, quizs } from "./";

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    authorId: uuid("author_id").references(() => users.id, { onDelete: "cascade" }),
    quizId: uuid("quiz_id").references(() => quizs.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow()
})