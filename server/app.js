import express from "express";
import userRouter from "./routes/userRouter.js";
import passport from "passport";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import "./passport-auth/local/passport-local.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",    
    credentials: true
}));
app.use(express.json());
app.use(expressSession(({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 2 * 1000
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
})));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", userRouter);
app.get("/", (_, res) => {
    return res.send("<h1>Welcome to Hangouts backend</h1>");
})

export default app;