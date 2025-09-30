"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    PORT: parseInt(process.env.PORT || "3000"),
    JWT_SECRET: process.env.JWT_SECRET || "",
    DATABASE_URL: process.env.DATABASE_URL || "",
    PROJECT_ID: process.env.STACK_PROJECT_ID || "",
    PUBLISHABLE_CLIENT_KEY: process.env.STACK_PUBLISHABLE_CLIENT_KEY || "",
    SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY || ""
};
