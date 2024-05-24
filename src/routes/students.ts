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
import { studentValidation } from "../utils/helpersValidator";
import { standartValidation } from "../middelwares/validation";
import { studentsServises } from "../servises/students";
import { StudentCreateModel } from "../models/StudentCreateModel";

export const studentsRouter = Router();

studentsRouter.post(
  "/",
  ...studentValidation,
  standartValidation,
  async (
    _req: RequestWithBody<StudentCreateModel>,
    res: Response<Student | null>
  ) => {
    const newStudent = await studentsServises.createStudent(_req.body.first_name, _req.body.last_name, 
      _req.body.email, _req.body.phone, _req.body.birthdate, _req.body.password);
    if (!newStudent) {
      res.statusCode = HTTP_STATUSES.DATA_EXISTS;
      res.statusMessage = "Student already exists";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.CREATED).json(newStudent);
  }
);
