import { Router } from "express";
import { authentication } from "../controllers/authenticationController.js";
import { createUser } from "../controllers/userController.js";

const router = Router();

router.post("/", authentication);
router.post("/register", createUser);

export default router;
