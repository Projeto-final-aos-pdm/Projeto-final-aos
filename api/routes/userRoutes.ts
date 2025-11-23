import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isOwerMiddleware } from "../middlewares/isOwnerMiddleware.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.put("/:userId", authMiddleware, isOwerMiddleware, updateUserById);
router.delete("/:userId", authMiddleware, isOwerMiddleware, deleteUserById);

export default router;
