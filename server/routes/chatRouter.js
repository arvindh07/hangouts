import { Router } from "express";
import { handleAccessOrCreateChat, handleGetAllChats } from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/token.js";

const router = Router();

// create chat
// fetch all chats
router.route("/")
    .post(verifyToken, handleAccessOrCreateChat)
    .get(verifyToken, handleGetAllChats);

export default router;