import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import { isAdmin } from "../middlewares/isAdmin";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers";

const userRouter = Router();

userRouter.get("/all", isAuthenticated, isAdmin, getAllUsers);
userRouter.get("/", isAuthenticated, getUser);
userRouter.put("/", isAuthenticated, updateUser);
userRouter.delete("/", isAuthenticated, deleteUser);

export default userRouter;