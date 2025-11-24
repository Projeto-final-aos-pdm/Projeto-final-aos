import { Router } from "express";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  createTransaction,
  deleteTransactionById,
  getAllTransaction,
  getAllTransactionsByCategoryId,
  getTransactionById,
  updateTransactionById,
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isOwerMiddleware } from "../middlewares/isOwnerMiddleware";

const router = Router();

router.get("/", getAllTransaction);

router.get(
  "/:transactionId",
  validateRequest({
    params: z.object({
      transactionId: z.string().uuid(),
    }),
  }),
  getTransactionById
);

router.post(
  "/user/:userId",
  authMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  createTransaction
);

router.put(
  "/:transactionId/user/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      transactionId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  updateTransactionById
);

router.delete(
  "/:transactionId/user/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      transactionId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  deleteTransactionById
);

router.get(
  "/category/:categoryId/user/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      categoryId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  getAllTransactionsByCategoryId
);
export default router;
