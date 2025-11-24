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
import { isOwnerMiddleware } from "../middlewares/isOwnerMiddleware.js";

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

router.post("/user/:userId", createAccount);

router.put(
  "/:accountId/user/:userId",
  isOwnerMiddleware,
  validateRequest({
    params: z.object({
      accountId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  updateAccount
);

router.delete(
  "/:accountId/user/:userId",
  isOwnerMiddleware,
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
  isOwnerMiddleware,
  validateRequest({
    params: z.object({
      accountId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  getAllTransactionsByAccount
);

export default router;
