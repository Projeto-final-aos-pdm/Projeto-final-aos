import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { userDTO } from "../dto/userDTO.js";
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
    const parsedData = userDTO.parse(req.body);

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const userDataWithHash = {
      ...parsedData,
      password: hashedPassword,
    };

    const userData = await createUserService(userDataWithHash);

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

    const verifyExistUserData = await getUserByIdService(userId);

    if (!verifyExistUserData) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const parsedData = userDTO.partial().parse(req.body);

    let updateData = { ...parsedData };

    if (parsedData.password !== undefined) {
      const hashedPassword = await bcrypt.hash(parsedData.password, 10);
      updateData = {
        ...updateData,
        password: hashedPassword,
      };
    }

    await updateUserByIdService(userId, parsedData);

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

    const verifyExistUserData = await getUserByIdService(userId);

    if (!verifyExistUserData) {
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
