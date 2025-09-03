import { Router } from "express";
import { getChats, getChatsById, createChat, deleteChat } from "../controller/chat.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.get("/", authMiddleware, getChats);
router.get("/:id", authMiddleware, getChatsById);
router.post("/", authMiddleware, createChat);
router.delete("/:id", authMiddleware, deleteChat);

export default router;
