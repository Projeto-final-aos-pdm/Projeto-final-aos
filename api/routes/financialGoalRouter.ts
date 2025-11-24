import { Router } from "express";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  createFinancialGoal,
  deleteFinancialGoalById,
  getAllFinancialGoal,
  getFinancialGoalById,
  updateFinancialGoalById,
} from "../controllers/financialGoalController.js";
import { isOwnerMiddleware } from "../middlewares/isOwnerMiddleware.js";

const router = Router();

router.get("/", getAllFinancialGoal);

router.get(
  "/:financialGoalId",
  validateRequest({
    params: z.object({
      financialGoalId: z.string().uuid(),
    }),
  }),
  getFinancialGoalById
);

router.post("/user/:userId", createFinancialGoal);

router.put(
  "/:financialGoalId/user/:userId",
  isOwnerMiddleware,
  validateRequest({
    params: z.object({
      financialGoalId: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  }),
  updateFinancialGoalById
);

router.delete(
  "/:financialGoalId/user/:userId",
  isOwnerMiddleware,
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
      financialGoalId: z.string().uuid(),
    }),
  }),
  deleteFinancialGoalById
);

export default router;
