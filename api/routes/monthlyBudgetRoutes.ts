import { Router } from "express";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  createMonthlyBudget,
  deleteMonthlyBudget,
  getAllMonthlyBudget,
  getMonthlyBudgetById,
  updateMonthlyBudget,
} from "../controllers/monthlyBudgetController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isOwerMiddleware } from "../middlewares/isOwnerMiddleware";

const router = Router();

router.use(authMiddleware, isOwerMiddleware);

router.get(
  "/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  getAllMonthlyBudget
);

router.get(
  "/:monthlyBudgetId/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
      monthlyBudgetId: z.string().uuid(),
    }),
  }),
  getMonthlyBudgetById
);

router.post(
  "/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  createMonthlyBudget
);

router.put(
  "/:monthlyBudgetId/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
      monthlyBudgetId: z.string().uuid(),
    }),
  }),
  updateMonthlyBudget
);

router.delete(
  "/:monthlyBudgetId/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
      monthlyBudgetId: z.string().uuid(),
    }),
  }),
  deleteMonthlyBudget
);

export default router;
