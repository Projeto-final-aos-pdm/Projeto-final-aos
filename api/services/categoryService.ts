import { eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { categoryTable } from "../db/schemas/category.js";
import type { CategoryDTO } from "../dto/categotyDTO.js";

const getAllCategoryService = async () => {
  return await database.query.categoryTable.findMany();
};

const getCategoryByIdService = async (categoryId: string) => {
  return await database.query.categoryTable.findFirst({
    where: eq(categoryTable.id, categoryId),
  });
};

const createCategoryService = async (data: CategoryDTO) => {
  return await database.insert(categoryTable).values(data).returning();
};

const updateCategoryByIdService = async (
  categoryId: string,
  data: Partial<CategoryDTO>
) => {
  return await database
    .update(categoryTable)
    .set(data)
    .where(eq(categoryTable.id, categoryId))
    .returning();
};

const deleteCategoryByIdService = async (categoryId: string) => {
  return await database
    .delete(categoryTable)
    .where(eq(categoryTable.id, categoryId));
};

export {
  createCategoryService,
  deleteCategoryByIdService,
  getAllCategoryService,
  getCategoryByIdService,
  updateCategoryByIdService,
};
