"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizs = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.quizs = (0, pg_core_1.pgTable)("quizs", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull()
});
