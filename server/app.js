import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";

dotenv.config();
// 1. initialization
const app = express();
const server = http.createServer(app);

// 2. middlewares
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.static("public"));

// 3. websocket
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    }
});
io.on("connection", (socket) => {
    // create room for incoming id + current user
    socket.on("setup", (currentUserId) => {
        // joined current user id
        socket.join(currentUserId);
        socket.emit("connected");
    })

    socket.on("join-room", (frndId) => {
        socket.join(frndId);
        console.log("User joined room ", frndId);
    })

    socket.on("one-message", (messageObject) => {
        // loop through the room and send the msg
        const { latestMsgObj } = messageObject;
        // const chat = latestMsgObj;
        if (!latestMsgObj?.chatRoom?.users) return;

        latestMsgObj?.chatRoom?.users?.forEach(user => {
            if (user._id !== latestMsgObj?.sender._id) {
                socket.in(user._id).emit("resend-message", messageObject)
            }
        });
    })
})

// 4. routes
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.get("/", (_, res) => {
    return res.send("<h1>Welcome to Hangouts backend</h1>");
})

export default server;