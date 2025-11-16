import { Router } from "express";
import { createFinancialGoal, deleteFinancialGoalById, getAllFinancialGoal, getFinancialGoalById, updateFinancialGoalById } from "../controllers/financialGoalController.js";

const router = Router();

router.get("/", getAllFinancialGoal);
router.get("/:financialGoalId", getFinancialGoalById);
router.post("/", createFinancialGoal);
router.put("/:financialGoalId", updateFinancialGoalById);
router.delete("/:financialGoalId", deleteFinancialGoalById);

export default router;