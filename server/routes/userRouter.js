import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/userController.js";
import passport from "passport";
import { checkSchema } from "express-validator";
import registerUserSchema from "../validation/authentication.js";
import { checkAuthStatus } from "../middlewares/authentication.js";

const userRouter = Router();

userRouter.post("/login", passport.authenticate('local'), loginHandler);
userRouter.post("/register", checkSchema(registerUserSchema), registerHandler);
userRouter.get("/status", checkAuthStatus, (req, res) => {
    return res.json({
        msg: "You are a valid user"
    });
})

export default userRouter;