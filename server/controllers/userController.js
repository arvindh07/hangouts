import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";
import { createRefreshToken, createAccessToken } from "../middlewares/token.js";

export const loginHandler = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            err: "All fields are required"
        })
    }
    // check if user exists
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        return res.status(400).json({
            err: "User doesnt exists. Please create a new one"
        })
    }
    // match password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        return res.status(400).json({
            err: "Password doesn't match"
        })
    }
    // create token
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    // return token
    res.cookie("jwt", refreshToken, {
        "httpOnly": true,
        "secure": process.env.ENV === "production" ? true : false,
        "same-site": "None",
        "maxAge": 3 * 1000
    })

    return res.status(200).json({
        id: user?._id,
        username: user?.username,
        email: user?.email,
        profilePic: user?.profilePic,
        token: accessToken
    })
}

export const registerHandler = async (req, res, next) => {
    // 1 check ip data that is needed for registering user
    // 2 check if user already exists
    // 3 hash password
    // 4 create user
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            err: result.array()
        })
    }
    const validatedData = matchedData(req);

    const findUser = await User.findOne({ email: validatedData.email });
    if (findUser) {
        return res.status(400).json({
            err: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(validatedData.password, 10);

    const newUser = await User.create({ ...validatedData, password: hashPassword });
    return res.status(201).json({
        msg: `User created successfully for ${newUser.username}`
    })
}

export const getAllUsers = async (req, res, next) => {
    const searchTerm = req.query?.search;
    if (searchTerm) {
        const searchedUsers = await User.find({
            $or: [{
                username: {
                    $regex: `${searchTerm}`, $options: "i"
                },
            }, {
                email: {
                    $regex: `${searchTerm}`, $options: "i"
                }
            }],
            _id: {
                $ne: req.user
            }
        }).select("-password");

        return res.status(200).json(searchedUsers);
    }
    const users = await User.find({
        $nor: [{
            _id: req.user
        }]
    }).select("-password");
    return res.status(200).json(users)
}

export const handleUser = () => {

}