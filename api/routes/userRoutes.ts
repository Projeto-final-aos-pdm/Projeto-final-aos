import { Router } from "express";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  createUser,
  deleteUserById,
  getAccountByIdAndUserId,
  getAllAccountsByUserId,
  getAllFinancialGoalsByUserId,
  getAllMonthlyBudgetByUserId,
  getAllUsers,
  getFinancialGoalByIdAndUserId,
  getMonthlyBudgetByIdAndUserId,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isOwerMiddleware } from "../middlewares/isOwnerMiddleware.js";

const router = Router();

router.get("/", getAllUsers);

router.get(
  "/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getUserById
);

router.post("/", createUser);

router.put(
  "/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  updateUserById
);

router.delete(
  "/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  deleteUserById
);

router.get(
  "/:userId/monthly-budget",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getAllMonthlyBudgetByUserId
);

router.get(
  "/:userId/monthly-budget/:monthlyBudgetId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getMonthlyBudgetByIdAndUserId
);

router.get(
  "/:userId/financial-goal",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getAllFinancialGoalsByUserId
);

router.get(
  "/:userId/financial-goal/:financialGoalId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getFinancialGoalByIdAndUserId
);

router.get(
  "/:userId/accounts",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getAllAccountsByUserId
);

router.get(
  "/:userId/accounts/:accountsId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getAccountByIdAndUserId
);

export default router;
