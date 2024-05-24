import { Router } from "express";
import type { Response } from "express";
import type {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
  User,
} from "../types";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import { userEmailValidator, userPasswordValidator, userValidation } from "../utils/helpersValidator";
import { standartValidation } from "../middelwares/validation";
import { UserLoginModel } from "../models/UserLoginModel";
import { usersServises } from "../servises/users";
import { jwtService } from "../application/jwtService";

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
    const user = await usersServises.checkCredentials(_req.body.email, _req.body.password);
    if (!user) {
      res.statusCode = HTTP_STATUSES.UNAUTHORIZED;
      res.statusMessage = "Invalid credentials";
      return res.json(null);
    }
    const token = await jwtService.generateToken(user);
    return res.status(HTTP_STATUSES.OK).json(token);
  }
);