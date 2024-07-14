import session from "express-session";
import MongoStore from "connect-mongo";

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 1000
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
})

export default sessionMiddleware;