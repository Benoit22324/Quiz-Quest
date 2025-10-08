import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "./env";
import { neon } from "@neondatabase/serverless";

async function migration() {
    const sql = neon(env.DATABASE_URL);
    
    const db = drizzle({ client: sql });

    console.log("Migration...");

    await migrate(db, { migrationsFolder: "src/migrations" });

    console.log("Migration done!");
}

migration();