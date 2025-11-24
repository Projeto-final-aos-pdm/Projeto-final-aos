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
} from "../controllers/transactionController.js";
import { isOwnerMiddleware } from "../middlewares/isOwnerMiddleware.js";

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
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  createTransaction
);

router.put(
  "/:transactionId/user/:userId",
  isOwnerMiddleware,
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
  isOwnerMiddleware,
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
  isOwnerMiddleware,
  validateRequest({
    params: z.object({
      categoryId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  getAllTransactionsByCategoryId
);
export default router;
