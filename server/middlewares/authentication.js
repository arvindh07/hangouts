export const checkAuthStatus = (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({
            "err": "Unauthorised. Please login"
        })
    }
    return res.status(200).json({
        "msg": "Logged in successfully"
    })
}