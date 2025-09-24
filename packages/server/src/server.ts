import express from "express";
import cors from "cors";
import { env } from "./config/env";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(env.PORT, () => console.log("API Online"));