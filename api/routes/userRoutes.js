import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateProfile } from "../controllers/userController.js";
import { updateStreak } from "../controllers/userController.js";

const router = express.Router();

router.put("/update", protectRoute, updateProfile);
router.post("/update-streak", protectRoute, updateStreak);

export default router;
