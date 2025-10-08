"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    username: (0, pg_core_1.varchar)("username", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 60 }).notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 100 }).notNull(),
    admin: (0, pg_core_1.boolean)("admin").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
