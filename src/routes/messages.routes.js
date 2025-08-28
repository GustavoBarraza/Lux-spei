import { Router } from "express";
import { createMessage } from "../controller/message.controller.js";

const router = Router();

router.post("/", createMessage);

export default router;