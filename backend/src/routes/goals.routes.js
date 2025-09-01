import express from "express";
import { createGoal, getGoals } from "../controller/goals.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const goals = express.Router();

goals.post("/goals", authMiddleware, createGoal);
goals.get("/goals", authMiddleware, getGoals);

export default goals;
