import express from "express";
import cors from "cors";
import http from "http";
import userRouter from "./routes/userRouter.js";
import { Socket } from "socket.io";

// 1. initialization
const app = express();
const server = http.createServer(app);
const io = new Socket({
    origin: "http://localhost:5173",
    credentials: true
})

// 2. middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.static("public"));

// 3. websocket
io.on("connection", (socket) => {
    console.log("A new socket connected", socket.id);
})

// 4. routes
app.use("/api/user", userRouter);
app.get("/", (_, res) => {
    return res.send("<h1>Welcome to Hangouts backend</h1>");
})

export default server;