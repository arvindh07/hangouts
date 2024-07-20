import jwt from "jsonwebtoken";

export const createToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    return token;
}

export const verifyToken = (req, res, next) => {
    if(!req.user){
        return res.status(200).json({
            err: "Token expired or invalid"
        })
    }

    const verify = jwt.verify(req.user, process.env.JWT_SECRET)
    next();
}