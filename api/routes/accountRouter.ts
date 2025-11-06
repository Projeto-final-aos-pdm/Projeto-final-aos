import { Router } from "express";
import { createAccount, deleteAccountById, getAccountById, getAllAccounts, updateAccountById } from "../controllers/accountController.js";


const router = Router();

router.get("/", getAllAccounts);
router.get("/:accountId", getAccountById);
router.post("/", createAccount);
router.put("/:accountId", updateAccountById);
router.delete("/:accountId", deleteAccountById);

export default router;