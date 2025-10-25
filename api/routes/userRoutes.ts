import { Router } from "express";
import {
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../src/middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getUserProfile);
router.put("/", authMiddleware, updateUserProfile);
router.delete("/", authMiddleware, deleteUserProfile);

export default router;