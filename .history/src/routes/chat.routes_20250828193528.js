import { Router } from "express";
<<<<<<< HEAD
import { getChats,getChatsById ,createChat, deleteChat } from "../controller/chat.controller.js";

const router = Router();

router.get("/get", getChats);
router.get("/get/:id", getChatsById);
router.post("/post", createChat);
router.delete("/delete/:id", deleteChat);
=======
import { createChat } from "../controller/chat.controller.js";

const router = Router();

router.post("/", createChat);
>>>>>>> 9a7ccf2f40f4b6000c7b5b62b57abc84ef87a478

export default router;