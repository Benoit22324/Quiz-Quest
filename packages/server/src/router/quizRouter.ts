import { Router } from "express";
import { addQuiz, deleteQuiz, getAllQuizs, getQuiz, updateQuiz } from "../controllers";
import { isAuthenticated } from "../middlewares";

const quizRouter = Router();

quizRouter.get("/", getAllQuizs);
quizRouter.get("/:id", getQuiz);
quizRouter.post("/", isAuthenticated, addQuiz);
quizRouter.put("/:id", isAuthenticated, updateQuiz);
quizRouter.delete("/:id", isAuthenticated, deleteQuiz);

export default quizRouter;