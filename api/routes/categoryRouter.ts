import { Router } from "express";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", getAllCategory);

router.get(
  "/:categoryId",
  validateRequest({
    params: z.object({
      categoryId: z.string().uuid(),
    }),
  }),
  getCategoryById
);

router.post("/", createCategory);

router.put(
  "/:categoryId",

  validateRequest({
    params: z.object({
      categoryId: z.string().uuid(),
    }),
  }),
  updateCategoryById
);

router.delete(
  "/:categoryId/",
  validateRequest({
    params: z.object({
      categoryId: z.string().uuid(),
    }),
  }),
  deleteCategoryById
);

export default router;
