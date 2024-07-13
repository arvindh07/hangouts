import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";

export const loginHandler = (req, res, next) => {
    return res.status(200).json({
        msg: "Login controller"
    })
}

export const registerHandler = async (req, res, next) => {
    // 1 check ip data that is needed for registering user
    // 2 check if user already exists
    // 3 hash password
    // 4 create user
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).json({
            err: result.array()
        })
    }
    const validatedData = matchedData(req);
    
    const findUser = await User.findOne({ email: validatedData.email });
    if(findUser) {
        return res.status(400).json({
            msg: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(validatedData.password, 10);

    const newUser = await User.create({...validatedData, password: hashPassword});
    return res.status(201).json({
        msg: `User created successfully for ${newUser.username}`
    })
}