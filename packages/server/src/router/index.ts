import { Router } from "express";
import authRouter from "./authRouter";
import quizRouter from "./quizRouter";
import userRouter from "./userRouter";
import partRouter from "./partRouter";
import noteRouter from "./noteRouter";
import commentRouter from "./commentRouter";
import runRouter from "./runRouter";

const router = Router();

router.use(authRouter);
router.use("/quiz", quizRouter);
router.use("/user", userRouter);
router.use("/part", partRouter);
router.use("/note", noteRouter);
router.use("/comment", commentRouter);
router.use("/run", runRouter);

export default router;