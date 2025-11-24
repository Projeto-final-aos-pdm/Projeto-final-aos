import type { Request, Response } from "express";
import { categoryDTO } from "../dto/categotyDTO.js";
import {
  createCategoryService,
  deleteCategoryByIdService,
  getAllCategoryService,
  getCategoryByIdService,
  updateCategoryByIdService,
} from "../services/categoryService.js";

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categoryList = await getAllCategoryService();

    res.status(200).send({
      message: "Request sucessfully",
      data: categoryList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).send({
        message: "Please insert financial goal id",
      });
    }

    const categoryData = await getCategoryByIdService(categoryId);

    if (!categoryData) {
      return res.status(404).send({
        message: "Financial Goal not found",
      });
    }

    res.status(200).send({
      message: "Request sucessfully, financialGoal found",
      data: categoryData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const parsedData = categoryDTO.parse(req.body);

    const categotyData = await createCategoryService(parsedData);

    res.status(201).send({
      message: "Created category sucessfully",
      data: categotyData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).send({
        message: "Please insert financial goal id",
      });
    }

    const verifyExistCategoryData = await getCategoryByIdService(categoryId);

    if (!verifyExistCategoryData) {
      return res.status(404).send({
        message: "Financial Goal not found",
      });
    }
    const parsedData = categoryDTO.partial().parse(req.body);

    const categoryData = await updateCategoryByIdService(
      categoryId,
      parsedData
    );

    res.status(200).send({
      message: "Category updated sucessfully",
      data: categoryData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).send({
        message: "Please insert financial goal id",
      });
    }

    const verifyExistCategoryData = await getCategoryByIdService(categoryId);

    if (!verifyExistCategoryData) {
      return res.status(404).send({
        message: "Financial Goal not found",
      });
    }

    await deleteCategoryByIdService(categoryId);

    res.status(200).send({
      message: "Delete category sucessfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

export {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
};
