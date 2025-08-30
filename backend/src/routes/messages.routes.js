import { Router } from "express";
import { getMessages,getMessagesById,createMessage,deleteMessage } from "../controller/message.controller.js";

const router = Router();

router.get("/get",getMessages);
router.get("/get/:id",getMessagesById);
router.post("/post", createMessage);
router.delete("/delete/:id",deleteMessage)

export default router;