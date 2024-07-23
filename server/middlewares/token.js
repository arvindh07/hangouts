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
        return res.status(401).json({
            err: "No token provided"
        })
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({
                    err: "Invalid token"
                })
            } else{
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