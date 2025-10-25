import type { Request, Response } from "express";
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from "../services/userService.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userList = await getAllUsersService();

    res.status(200).send({
      message: "Requet sucessfully",
      data: userList,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({
        message: "Please insert userId",
      });
    }

    const userData = await getUserByIdService(userId);

    if (!userData) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send({
      message: "Request sucessfuly, user found!!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = await createUserService(req.body);

    res.status(201).send({
      message: "Request sucessfully, created user",
      data: userData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({
        message: "Please insert userId",
      });
    }

    const verifyUserExist = await getUserByIdService(userId);

    if (!verifyUserExist) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    await updateUserByIdService(userId, req.body);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({
        message: "Please insert userId",
      });
    }

    const verifyUserExist = await getUserByIdService(userId);

    if (!verifyUserExist) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    await deleteUserByIdService(userId);

    res.status(200).send({
      message: "Delete user sucessfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

export { createUser, deleteUserById, getAllUsers, getUserById, updateUserById };
