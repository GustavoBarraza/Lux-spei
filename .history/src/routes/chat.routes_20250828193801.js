import { Router } from "express";
import { getChats,getChatsById ,createChat, deleteChat } from "../controller/chat.controller.js";

const router = Router();

router.get("/get", getChats);
router.get("/get/:id", getChatsById);
router.post("/post", createChat);
router.delete("/delete/:id", deleteChat);

export default router;