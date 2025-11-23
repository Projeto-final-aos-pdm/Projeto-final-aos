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
  getAllFinancialGoal
);
router.get(
  "/:financialGoalId/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
      financialGoalId: z.string().uuid(),
    }),
  }),
  getFinancialGoalById
);
router.post(
  "/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
    }),
  }),
  createFinancialGoal
);
router.put(
  "/:financialGoalId/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
      financialGoalId: z.string().uuid(),
    }),
  }),
  getFinancialGoalById,
  updateFinancialGoalById
);
router.delete(
  "/:financialGoalId/user/:userId",
  validateRequest({
    params: z.object({
      userId: z.string().uuid(),
      financialGoalId: z.string().uuid(),
    }),
  }),
  getFinancialGoalById,
  deleteFinancialGoalById
);

export default router;
