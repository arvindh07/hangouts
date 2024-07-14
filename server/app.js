import express from "express";
import passport from "passport";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/userRouter.js";
import "./passport-auth/local/passport-local.js";
import sessionMiddleware from "./middlewares/session.js";

// 1. initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

// users list
const usersList = {}

// 2. middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

io.engine.use(sessionMiddleware);

// 3. socket implementation
io.on("connection", (client) => {
    console.log("A new user connected ", client.id, "✅");
    console.log("req", client.request.session?.passport);

    // set user
    const user = client.request.session?.passport?.user;
    if (!user?.id) {
        // need to handle later
    } else {
        usersList[user?.id] = {
            username: user?.username,
            socketId: client?.id,
            socket: client
        }
    }
    console.log("users -> ", usersList);
    client.on("clientMessage", (msg) => {
        console.log("Message received from client: ", msg);
        io.emit("serverMessage", msg);
    })

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

export default server;