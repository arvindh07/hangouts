import { Router } from "express";
import { verifyToken } from "../middlewares/token.js";
import { handleCreateMessage, handleGetAllMessages } from "../controllers/messageController.js";

const router = Router();

router.post("/", verifyToken, handleCreateMessage)
router.post("/get", verifyToken, handleGetAllMessages)

export default router;