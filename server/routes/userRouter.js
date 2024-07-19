import { Router } from "express";
import { getAllUsers, loginHandler, registerHandler } from "../controllers/userController.js";
import { checkSchema } from "express-validator";
import registerUserSchema from "../validation/authentication.js";

const userRouter = Router();

userRouter.post("/register", checkSchema(registerUserSchema), registerHandler);
userRouter.post("/login", loginHandler);
userRouter.get("/", getAllUsers);

export default userRouter;