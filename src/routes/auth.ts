import { Router } from "express";
import type { Response } from "express";
import type {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
  Student,
} from "../types";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import { studentEmailValidator, studentPasswordValidator, studentValidation } from "../utils/helpersValidator";
import { standartValidation } from "../middelwares/validation";
import { studentsServises } from "../servises/students";
import { StudentLoginModel } from "../models/StudentLoginModel";

export const authRouter = Router();

authRouter.post(
  "/login",
  studentEmailValidator,
    studentPasswordValidator,
  standartValidation,
  async (
    _req: RequestWithBody<StudentLoginModel>,
    res: Response<boolean>
  ) => {
    const checkResult = await studentsServises.checkCredentials(_req.body.email, _req.body.password);
    if (!checkResult) {
      res.statusCode = HTTP_STATUSES.UNAUTHORIZED;
      res.statusMessage = "Invalid credentials";
      return res.json(false);
    }
    return res.status(HTTP_STATUSES.CREATED).json(true);
  }
);