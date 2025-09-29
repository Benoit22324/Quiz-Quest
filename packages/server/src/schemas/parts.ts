import { pgTable, smallint, uuid, varchar } from "drizzle-orm/pg-core";
import { quizs } from "./";

export const parts = pgTable("parts", {
    id: uuid("id").defaultRandom().primaryKey(),
    question: varchar("question", { length: 255 }).notNull(),
    answer: varchar("answer", { length: 255 }).notNull(),
    correctAnswer: varchar("correct_answer", { length: 255 }).notNull(),
    quizIndex: smallint("quiz_index").notNull(),
    quizId: uuid("quiz_id").references(() => quizs.id, { onDelete: "cascade" }).notNull()
})