import { Router } from "express";
import { createCategory, deleteCategoryById, getAllCategory, getCategoryById, updateCategoryById } from "../controllers/categoryController.js";

const router = Router();

router.get("/", getAllCategory);
router.get("/:categoryId", getCategoryById);
router.post("/", createCategory);
router.put("/:categoryId", updateCategoryById);
router.delete("/:categoryId", deleteCategoryById);

export default router;