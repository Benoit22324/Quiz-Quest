import { env } from "./env";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "../schemas";
import { neon, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export const sql = neon(env.DATABASE_URL);

export const db: NeonHttpDatabase<typeof schema> = drizzle({ client: sql, schema });