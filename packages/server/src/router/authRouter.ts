import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import { authLogin, authLogout, authRegister } from "../controllers";
import { isNotAuthenticated } from "../middlewares/isNotAuthenticated";

const authRouter = Router();

authRouter.get("/logout", isAuthenticated, authLogout);
authRouter.post("/login", isNotAuthenticated, authLogin);
authRouter.post("/register", isNotAuthenticated, authRegister);

export default authRouter;