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
router.get("/:transactionId", getTransactionById);
router.post("/", createTransaction);
router.put("/:transactionId", updateTransactionById);
router.delete("/:transactionId", deleteTransactionById);

export default router;
