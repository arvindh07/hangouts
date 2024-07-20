import jwt from "jsonwebtoken";

export const createToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
    return token;
}

export const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization ? req.headers?.authorization?.split(" ")[1] : null;
    if (!token) {
        return res.status(400).json({
            err: "Token expired or invalid"
        })
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify?.userId;
        next();
    } catch (error) {
        return res.status(400).json({
            err: "Token expired or invalid"
        })
    }
}