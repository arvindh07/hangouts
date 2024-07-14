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

    // set user
    const user = client.request.session?.passport?.user;
    let sendUsers = {};
    if (!user?.id) {
        // need to handle later
    } else {
        usersList[user?.id] = {
            username: user?.username,
            socketId: client?.id,
            socket: client
        }
        // send users list to client
        for (const key in usersList) {
            sendUsers[key] = usersList?.[key]?.username;
        }

    }
    console.log("users ** -> ", sendUsers);
    client.emit("userData", JSON.stringify({sendUsers, currentId: user?.id}));
    // console.log("users -> ", usersList);
    client.on("clientMessage", (msg) => {
        console.log("Message received from client: ", msg);
        const otherPerson = usersList["6692123612b4f7f534dd922b"];
        otherPerson?.socket?.emit("serverMessage", msg);
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