import { Router } from "express";
import {
  authentication,
  logout,
} from "../controllers/authenticationController.js";
import { createUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authentication);
router.post("/register", createUser);
router.post("/logout", authMiddleware, logout);

export default router;
