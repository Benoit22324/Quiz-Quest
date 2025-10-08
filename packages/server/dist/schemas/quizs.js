"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizs = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.quizs = (0, pg_core_1.pgTable)("quizs", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 100 }).notNull(),
    difficulty: (0, pg_core_1.varchar)("difficulty", { length: 60 }).notNull(),
    authorId: (0, pg_core_1.uuid)("author_id").references(() => _1.users.id, { onDelete: "cascade" }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
