import { Router } from "express";
import { addNote, deleteNote, getNoteByQuizUser, getNotesByQuiz, updateNote } from "../controllers";
import { isAuthenticated } from "../middlewares";

const noteRouter = Router();

noteRouter.get("/:quizId", getNotesByQuiz);
noteRouter.get("/:quizId/user", isAuthenticated, getNoteByQuizUser);
noteRouter.post("/:quizId", isAuthenticated, addNote);
noteRouter.put("/:id", isAuthenticated, updateNote);
noteRouter.delete("/:id", isAuthenticated, deleteNote);

export default noteRouter;