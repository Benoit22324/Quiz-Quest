import { Router } from "express";
import { addQuizPart, deleteQuizPart, getPartsByQuiz, getQuizPart, updateQuizPart } from "../controllers";
import { isAuthenticated } from "../middlewares";

const partRouter = Router();

partRouter.get("/:quizId", getPartsByQuiz);
partRouter.get("/:id/:index", getQuizPart);
partRouter.post("/:quizId", isAuthenticated, addQuizPart);
partRouter.put("/:id", isAuthenticated, updateQuizPart);
partRouter.delete("/:id", isAuthenticated, deleteQuizPart);

export default partRouter;