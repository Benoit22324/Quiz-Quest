import { Pool } from "pg";
import { env } from "./env";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "../schemas";

export const pool = new Pool({
    connectionString: env.DATABASE_URL
})

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });