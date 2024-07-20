import jwt from "jsonwebtoken";

export const createToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
    return token;
}

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
        const verify = jwt.verify(token + "1", process.env.JWT_SECRET);
        req.user = verify?.userId;
        next();
    } catch (error) {
        return res.status(400).json({
            err: "Token expired or invalid"
        })
    }
}