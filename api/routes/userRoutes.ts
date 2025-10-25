import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.put("/:userId", updateUserById);
router.delete("/:userId", deleteUserById);

export default router;
