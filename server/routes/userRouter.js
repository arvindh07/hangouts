import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/userController.js";
import { checkSchema } from "express-validator";
import registerUserSchema from "../validation/authentication.js";

const userRouter = Router();

userRouter.post("/login", loginHandler);
userRouter.post("/register", checkSchema(registerUserSchema), registerHandler);

export default userRouter;