import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 60 }).notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    admin: boolean("admin").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow()
})