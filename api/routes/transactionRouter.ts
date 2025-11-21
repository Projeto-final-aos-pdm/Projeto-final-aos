import { Router } from "express";
import {
  createTransaction,
  deleteTransactionById,
  getAllTransaction,
  getTransactionById,
  updateTransactionById,
} from "../controllers/transactionController";

const router = Router();

router.get("/", getAllTransaction);
router.get("/:financialGoalId", getTransactionById);
router.post("/", createTransaction);
router.put("/:financialGoalId", updateTransactionById);
router.delete("/:financialGoalId", deleteTransactionById);

export default router;
