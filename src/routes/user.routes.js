// src/routes/user.routes.js
import { Router } from "express";
import { getProfile, updateProfile, deleteUser } from "../controller/user.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.get("/profile:id", authMiddleware, getProfile);
router.put("/profile:id", authMiddleware, updateProfile);
router.delete("/profile:id", authMiddleware, deleteUser);

export default router;
