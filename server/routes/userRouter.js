import { Router } from "express";
import { getAllUsers, handleLogout, handleUser, loginHandler, registerHandler } from "../controllers/userController.js";
import { checkSchema } from "express-validator";
import registerUserSchema from "../validation/authentication.js";
import { verifyRefreshToken, verifyToken } from "../middlewares/token.js";

const userRouter = Router();

userRouter.post("/register", checkSchema(registerUserSchema), registerHandler);
userRouter.post("/login", loginHandler);
userRouter.get("/", verifyToken, getAllUsers);
userRouter.get("/refresh", verifyRefreshToken);
userRouter.post("/logout", handleLogout);
// userRouter.get("/status", refreshToken, handleUser);

export default userRouter;