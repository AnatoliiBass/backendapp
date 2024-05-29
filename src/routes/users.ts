import { Router } from "express";
import type { Response } from "express";
import type { RequestWithBody } from "../types";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import { userValidation } from "../utils/helpersValidator";
import { standartValidation } from "../middelwares/validation";
import { UserCreateModel } from "../models/UserCreateModel";
import { usersServises } from "../servises/users";
import { UserReturnModel } from "../models/UserReturnModel";

export const usersRouter = Router();

usersRouter.post(
  "/",
  ...userValidation,
  standartValidation,
  async (
    _req: RequestWithBody<UserCreateModel>,
    res: Response<UserReturnModel | null>
  ) => {
    const newUser = await usersServises.createUser(_req.body.first_name, _req.body.last_name, _req.body.role,
      _req.body.email, _req.body.phone, _req.body.birthdate, _req.body.password);
    if (!newUser) {
      res.statusCode = HTTP_STATUSES.DATA_EXISTS;
      res.statusMessage = "User already exists";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.CREATED).json(newUser);
  }
);
