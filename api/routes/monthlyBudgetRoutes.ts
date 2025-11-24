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

router.get("/", getAllMonthlyBudget);

router.get(
  "/:monthlyBudgetId",
  validateRequest({
    params: z.object({
      monthlyBudgetId: z.string().uuid(),
    }),
  }),
  getMonthlyBudgetById
);

router.post(
  "/user/:userId",
  authMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  createMonthlyBudget
);

router.put(
  "/:monthlyBudgetId/user/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      monthlyBudgetId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  updateMonthlyBudget
);

router.delete(
  "/:monthlyBudgetId/user/:userId",
  authMiddleware,
  isOwerMiddleware,
  validateRequest({
    params: z.object({
      monthlyBudgetId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  deleteMonthlyBudget
);

export default router;
