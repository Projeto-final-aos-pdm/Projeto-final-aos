import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authenticationDTO } from "../dto/authenticationDTO.js";
import env from "../env.js";
import { getUserByEmail } from "../services/userService.js";

const authentication = async (req: Request, res: Response) => {
  try {
    const parsedData = authenticationDTO.parse(req.body);

    const userData = await getUserByEmail(parsedData);

    if (!userData) {
      return res.status(404).send({
        error: "Invalid email or password",
      });
    }

    const verifyPassword = await bcrypt.compare(
      parsedData.password,
      userData.password
    );

    if (!verifyPassword) {
      return res.status(401).send({
        error: "Invalid email or password",
      });
    }

    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY is not set!");
      return res.status(500).send({
        error: "Server misconfigured",
      });
    }

    const token = jwt.sign(
      { userId: userData.id, userEmail: userData.email },
      env.SECRET_KEY,
      {
        expiresIn: "4h",
      }
    );

    res.status(200).send({
      message: "Login sucessfully",
      token: token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Server Error",
      erro: error,
    });
  }
};

export { authentication };
