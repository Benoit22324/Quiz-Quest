"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.parts = (0, pg_core_1.pgTable)("parts", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    question: (0, pg_core_1.varchar)("question", { length: 255 }).notNull(),
    answers: (0, pg_core_1.varchar)("answers", { length: 255 }).notNull(),
    correctAnswer: (0, pg_core_1.varchar)("correct_answer", { length: 255 }).notNull(),
    quizIndex: (0, pg_core_1.smallint)("quiz_index").notNull(),
    quizId: (0, pg_core_1.uuid)("quiz_id").references(() => _1.quizs.id, { onDelete: "cascade" }).notNull()
});
