import { Router } from "express";
import type { Response } from "express";
import type { RequestWithBody } from "../types";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import {
  userEmailValidator,
  userPasswordValidator,
  userValidation,
} from "../utils/helpersValidator";
import { standartValidation } from "../middelwares/validation";
import { UserLoginModel } from "../models/UserLoginModel";
import { usersServises } from "../servises/users";
import { jwtService } from "../application/jwtService";
import type { UserCreateModel } from "../models/UserCreateModel";
import { UserReturnModel } from "../models/UserReturnModel";

export const authRouter = Router();

authRouter.post(
  "/login",
  userEmailValidator,
  userPasswordValidator,
  standartValidation,
  async (
    _req: RequestWithBody<UserLoginModel>,
    res: Response<string | null>
  ) => {
    const user = await usersServises.checkCredentials(
      _req.body.email,
      _req.body.password
    );
    if (!user) {
      res.statusCode = HTTP_STATUSES.UNAUTHORIZED;
      res.statusMessage = "Invalid credentials";
      return res.json(null);
    }
    const token = await jwtService.generateToken(user);
    res.cookie("refreshtoken", token.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
    });
    return res.status(HTTP_STATUSES.OK).json(token.token);
  }
);

authRouter.post(
  "/register",
  ...userValidation,
  standartValidation,
  async (
    _req: RequestWithBody<UserCreateModel>,
    res: Response<UserReturnModel | null | undefined>
  ) => {
    const newUser: UserReturnModel = await usersServises.createUser(_req.body.first_name, _req.body.last_name, _req.body.role,
      _req.body.email, _req.body.phone, _req.body.birthdate, _req.body.password);
    if (newUser === null) {
      res.statusCode = HTTP_STATUSES.BAD_REQUEST;
      res.statusMessage = "User not created";
      return res.json(null);
    }
    if (newUser === undefined) {
      res.statusCode = HTTP_STATUSES.DATA_EXISTS;
      res.statusMessage = "User already exists. Please, try another email, or try to confirm your email, or try again after 5 min.";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.CREATED).json(newUser);
  }
);

authRouter.post(
  "/resetPassword",
  userEmailValidator,
  userPasswordValidator,
  standartValidation,
  async (
    _req: RequestWithBody<{ email: string, password: string }>,
    res: Response<boolean>
  ) => {
    const result = await usersServises.resetPassword(_req.body.email, _req.body.password);
    return res.status(HTTP_STATUSES.OK).json(result);
  }
)
