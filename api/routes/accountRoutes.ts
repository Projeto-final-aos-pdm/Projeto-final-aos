import { Router } from "express";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccounts,
  getAllTransactionsByAccount,
  updateAccount,
} from "../controllers/accountController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isOwerMiddleware } from "../middlewares/isOwnerMiddleware.js";

const router = Router();

router.get("/", getAllAccounts);

router.get(
  "/:accountId",
  validateRequest({
    params: z.object({
      accountId: z.string().uuid(),
    }),
  }),
  getAccountById
);

router.post("/user/:userId", authMiddleware, createAccount);

router.put(
  "/:accountId/user/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      accountId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  updateAccount
);

router.delete(
  ":accountId/user/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      accountId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  deleteAccount
);

router.get(
  ":accountId/transactions/user/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      accountId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  getAllTransactionsByAccount
);

export default router;
