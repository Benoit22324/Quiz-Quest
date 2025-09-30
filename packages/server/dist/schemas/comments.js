"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.comments = (0, pg_core_1.pgTable)("comments", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    content: (0, pg_core_1.text)("content").notNull(),
    authorId: (0, pg_core_1.uuid)("author_id").references(() => _1.users.id, { onDelete: "cascade" }),
    quizId: (0, pg_core_1.uuid)("quiz_id").references(() => _1.quizs.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
