import { Router } from "express";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccounts,
  updateAccount,
} from "../controllers/accountController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isOwerMiddleware } from "../middlewares/isOwnerMiddleware.js";

const router = Router();

router.use(authMiddleware, isOwerMiddleware);

router.get(
  "/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getAllAccounts
);

router.get(
  "/:accountId/user/:userId",
  validateRequest({
    params: z.object({
      accountId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  getAccountById
);

router.post(
  "/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  createAccount
);

router.put(
  ":accountId/user/:userId",
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
  validateRequest({
    params: z.object({
      accountId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  deleteAccount
);

export default router;
