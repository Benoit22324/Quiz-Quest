import express from "express";
import cors from "cors";
import { env } from "./config/env";
import cookieParser from "cookie-parser";
import router from "./router";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://quizquestfront-production.up.railway.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(env.PORT, () => console.log("API Online"));