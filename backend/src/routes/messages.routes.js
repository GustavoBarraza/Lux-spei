import { Router } from "express";
import { getMessagesByChat, createMessage } from "../controller/message.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.get("/:id_chat", authMiddleware, getMessagesByChat);
router.post("/", authMiddleware, createMessage);

export default router;
