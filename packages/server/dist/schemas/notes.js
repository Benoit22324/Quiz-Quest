"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.notes = (0, pg_core_1.pgTable)("notes", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    note: (0, pg_core_1.smallint)("note").notNull(),
    userId: (0, pg_core_1.uuid)("user_id").references(() => _1.users.id, { onDelete: "cascade" }).notNull(),
    quizId: (0, pg_core_1.uuid)("quiz_id").references(() => _1.quizs.id, { onDelete: "cascade" }).notNull()
});
