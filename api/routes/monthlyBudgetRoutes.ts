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
router.get("/:monthlyBudgetId", getMonthlyBudgetById);
router.post("/", createMonthlyBudget);
router.put("/:monthlyBudgetId", updateMonthlyBudget);
router.delete("/:monthlyBudgetId", deleteMonthlyBudget);

export default router;
