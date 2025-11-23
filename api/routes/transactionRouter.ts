import { Router } from "express";
import {
  createTransaction,
  deleteTransactionById,
  getAllTransaction,
  getTransactionById,
  updateTransactionById,
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isOwerMiddleware } from "../middlewares/isOwnerMiddleware";

const router = Router();
router.use(authMiddleware, isOwerMiddleware);

router.get("/", getAllTransaction);
router.get("/:transactionId", getTransactionById);
router.post("/", createTransaction);
router.put("/:transactionId", updateTransactionById);
router.delete("/:transactionId", deleteTransactionById);

export default router;
