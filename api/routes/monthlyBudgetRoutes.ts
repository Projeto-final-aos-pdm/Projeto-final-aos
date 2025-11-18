import { Router } from "express";
import {
  createMonthlyBudget,
  deleteMonthlyBudget,
  getAllMonthlyBudget,
  getMonthlyBudgetById,
  updateMonthlyBudget,
} from "../controllers/monthlyBudgetController";

const router = Router();

router.get("/", getAllMonthlyBudget);
router.get("/:financialGoalId", getMonthlyBudgetById);
router.post("/", createMonthlyBudget);
router.put("/:financialGoalId", updateMonthlyBudget);
router.delete("/:financialGoalId", deleteMonthlyBudget);

export default router;
