import express from "express";
import cors from "cors";
import http from "http";
import userRouter from "./routes/userRouter.js";
import path from "path";

// 1. initialization
const app = express();
const server = http.createServer(app);

// 2. middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.static("public"));

// 4. routes
app.use("/api/user", userRouter);
app.get("/", (_, res) => {
    return res.send("<h1>Welcome to Hangouts backend</h1>");
})

export default server;