import { Router } from "express";
import { authentication } from "../controllers/loginController.js";

const router = Router();

router.post("/", authentication);

export default router;
