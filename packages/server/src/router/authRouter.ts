import { Router } from "express";
import { authLogin, authRegister } from "../controllers";
import { isNotAuthenticated } from "../middlewares/isNotAuthenticated";

const authRouter = Router();

authRouter.post("/login", isNotAuthenticated, authLogin);
authRouter.post("/register", isNotAuthenticated, authRegister);

export default authRouter;