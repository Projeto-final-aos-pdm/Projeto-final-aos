import { Router } from "express";
import { authentication } from "../controllers/authenticationController.js";

const router = Router();

router.post("/", authentication);

export default router;
