import { Router } from "express";
import {
  authentication,
  decodeToken,
  logout,
} from "../controllers/authenticationController.js";
import { createUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authentication);
router.post("/register", createUser);
router.post("/logout", authMiddleware, logout);
router.post("/decode", authMiddleware, decodeToken);

export default router;
