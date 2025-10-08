import { Router } from "express";
import { addComment, deleteComment, getCommentsByQuiz, updateComment } from "../controllers";
import { isAuthenticated } from "../middlewares";

const commentRouter = Router();

commentRouter.get("/:quizId", getCommentsByQuiz);
commentRouter.post("/:quizId", isAuthenticated, addComment);
commentRouter.put("/:id", isAuthenticated, updateComment);
commentRouter.delete("/:id", isAuthenticated, deleteComment);

export default commentRouter;