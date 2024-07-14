import express from "express";
import passport from "passport";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";
import userRouter from "./routes/userRouter.js";
import "./passport-auth/local/passport-local.js";

// 1. initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

// 2. middlewares
app.use(cors());
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

// 3. socket implementation
io.on("connection", (client) => {
    console.log("A new user connected ", client.id, "✅");

    // emit a welcome msg
    client.emit("message", "Welcome to hangouts🚀")

    // disconnect
    client.on("disconnect", () => {
        console.log(`${client.id} disconnected❌`);
    })
})

// 4. routes
app.use("/api", userRouter);
app.get("/", (_, res) => {
    return res.send("<h1>Welcome to Hangouts backend</h1>");
})

export default app;