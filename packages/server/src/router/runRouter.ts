import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import { addRun, deleteRun, getRunsByUser } from "../controllers";

const runRouter = Router();

runRouter.get("/:userId", isAuthenticated, getRunsByUser);
runRouter.post("/:quizId", isAuthenticated, addRun);
runRouter.delete("/:id", isAuthenticated, deleteRun);

export default runRouter;