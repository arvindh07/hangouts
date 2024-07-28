import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const createAccessToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1m"
    })
    return token;
}

export const createRefreshToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "2m"
    })
    return token;
}

export const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization ? req.headers?.authorization?.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({
            err: "No token provided"
        })
    }

    try {
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({
                    err: "Invalid token"
                })
            } else {
                req.user = decodedToken?.userId
                next();
            }
        });
    } catch (error) {
        return res.status(401).json({
            err: "Token expired or invalid second"
        })
    }
}

export const verifyRefreshToken = (req, res, next) => {
    // get token from cookie
    // if no token, return
    // else, verifyRefreshToken and create access token and return
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if(err) {
            return res.status(403).json({
                msg: "Forbidden"
            })
        }

        const findUser = await User.findById(decoded?.userId);
        if (!findUser) {
            return res.status(403).json({
                msg: "Forbidden"
            })
        }

        const newAccessToken = jwt.sign({ userId: findUser?._id }, process.env.JWT_ACCESS_SECRET);
        return res.status(200).json({
            "token": newAccessToken
        })
    })
}