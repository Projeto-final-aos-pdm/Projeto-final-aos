import { Router } from "express";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  createMonthlyBudget,
  deleteMonthlyBudget,
  getAllMonthlyBudget,
  getMonthlyBudgetById,
  updateMonthlyBudget,
} from "../controllers/monthlyBudgetController.js";
import { isOwnerMiddleware } from "../middlewares/isOwnerMiddleware.js";

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
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  createMonthlyBudget
);

router.put(
  "/:monthlyBudgetId/user/:userId",
  isOwnerMiddleware,
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
  isOwnerMiddleware,
  validateRequest({
    params: z.object({
      monthlyBudgetId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  deleteMonthlyBudget
);

export default router;
