import dotenv from "dotenv";
import { EnvConfig } from "../types/EnvConfig";

dotenv.config();

export const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "3000"),
    DATABASE_URL: process.env.DATABASE_URL || "",
    PROJECT_ID: process.env.STACK_PROJECT_ID || "",
    PUBLISHABLE_CLIENT_KEY: process.env.STACK_PUBLISHABLE_CLIENT_KEY || "",
    SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY || ""
}