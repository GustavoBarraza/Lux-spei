import { Router } from "express";
import { createChat } from "../controller/chat.controller.js";

const router = Router();

router.post("/", createChat);

export default router;