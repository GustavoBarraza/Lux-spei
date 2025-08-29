import { Router } from "express";
<<<<<<< HEAD
import { getMessages,getMessagesById,createMessage,deleteMessage } from "../controller/message.controller.js";

const router = Router();

router.get("/get",getMessages);
router.get("/get/:id",getMessagesById);
router.post("/post", createMessage);
router.delete("/delete/:id",deleteMessage)
=======
import { createMessage } from "../controller/message.controller.js";

const router = Router();

router.post("/", createMessage);
>>>>>>> 9a7ccf2f40f4b6000c7b5b62b57abc84ef87a478

export default router;