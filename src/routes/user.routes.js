// src/routes/user.routes.js
import { Router } from "express";
import { getProfile, updateProfile, deleteUser } from "../controller/user.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.delete("/profile", authMiddleware, deleteUser);

export default router;