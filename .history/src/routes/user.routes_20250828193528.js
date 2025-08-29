// src/routes/user.routes.js
import { Router } from "express";
import { getProfile, updateProfile, deleteUser } from "../controller/user.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.delete("/profile", authMiddleware, deleteUser);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 9a7ccf2f40f4b6000c7b5b62b57abc84ef87a478
