import { Router } from "express";
import { handleAccessOrCreateChat, handleGetAllChats, handleSeenMessages } from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/token.js";

const router = Router();

// create chat
// fetch all chats
router.route("/")
    .post(verifyToken, handleAccessOrCreateChat)
    .get(verifyToken, handleGetAllChats);

router.post("/seen", handleSeenMessages);

export default router;