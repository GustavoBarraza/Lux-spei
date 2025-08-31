import { Router } from "express";
import { getComments,getCommentsById ,createComments, deleteComments } from "../controller/comments.controller.js";

const router = Router();

router.get("/get", getComments);
router.get("/get/:id", getCommentsById);
router.post("/post", createComments);
router.delete("/delete/:id", deleteComments);

export default router;