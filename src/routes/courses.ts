import { Router } from "express";
import type { Response } from "express";
import type {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../types";
import type { CourseGetWithQueryModel } from "../models/CourseGetWithQueryModel";
import type { CourseViewModel } from "../models/CourseViewModel";
import type { CourseURIParamsModel } from "../models/CourseURIParamsModel";
import type { CourseCreateModel } from "../models/CourseCreateModel";
import type { CourseUpdateModel } from "../models/CourseUpdateModel";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import { coursesServises } from "../servises/courses";
import { firstNameValidator, lastNameValidator, nameValidator } from "../utils/helpersValidator";
import { coursesValidation } from "../middelwares/validation";
import { coursesRepositoryQueries } from "../repositories/coursesFromDBQueries";

export const coursesRouter = Router();
coursesRouter.get(
  "/",
  async (
    _req: RequestWithQuery<CourseGetWithQueryModel>,
    res: Response<CourseViewModel[]>
  ) => {
    const courses = await coursesRepositoryQueries.getAllCourses(_req.query.name);
    return res.status(HTTP_STATUSES.OK).json(courses);
  }
);

coursesRouter.get(
  "/:id(\\d+)",
  async (
    _req: RequestWithParams<CourseURIParamsModel>,
    res: Response<CourseViewModel | null>
  ) => {
    const course = await coursesRepositoryQueries.getCourseById(+_req.params.id);
    if (!course) {
      res.statusCode = HTTP_STATUSES.NOT_FOUND;
      res.statusMessage = "Course not found";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.OK).json(course);
  }
);

coursesRouter.delete(
  "/:id(\\d+)",
  async (_req: RequestWithParams<CourseURIParamsModel>, res: Response) => {
    const isDeleted = await coursesServises.deleteCourse(+_req.params.id);
    if (!isDeleted) {
      return res.status(HTTP_STATUSES.NOT_FOUND).send("Course not found");
    }
    return res.status(HTTP_STATUSES.NO_CONTENT).send("Course deleted");
  }
);

coursesRouter.post(
  "/",
  nameValidator,
  firstNameValidator,
  lastNameValidator,
  coursesValidation,
  async (
    _req: RequestWithBody<CourseCreateModel>,
    res: Response<CourseViewModel | null>
  ) => {
    const newCourse = await coursesServises.createCourse(_req.body.name, _req.body.author_first_name, _req.body.author_last_name);
    if (!newCourse) {
      res.statusCode = HTTP_STATUSES.DATA_EXISTS;
      res.statusMessage = "Course already exists";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.CREATED).json(newCourse);
  }
);

coursesRouter.put(
  "/:id(\\d+)",
  nameValidator,
  coursesValidation,
  async (
    _req: RequestWithParamsAndBody<CourseURIParamsModel, CourseUpdateModel>,
    res: Response<CourseViewModel | null>
  ) => {
    const course = await coursesServises.updateCourse(
      +_req.params.id,
      _req.body.name
    );
    if (!course) {
      res.statusCode = HTTP_STATUSES.NOT_FOUND;
      res.statusMessage = "Course not found";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.CREATED).json(course);
  }
);
