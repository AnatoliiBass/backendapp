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
import { commentValidator, userEmailValidator, userPasswordValidator, userValidation } from "../utils/helpersValidator";
import { standartValidation } from "../middelwares/validation";
import { UserLoginModel } from "../models/UserLoginModel";
import { usersServises } from "../servises/users";
import { jwtService } from "../application/jwtService";
import type { FeedBackCreateModel } from "../models/FeedBackCreateModel";
import { authValidation } from "../middelwares/auth";
import { feedbackServises } from "../servises/feedback";

export const feedbackRouter = Router();

feedbackRouter.post(
  "/",
  commentValidator,
  authValidation,
  async (
    _req: RequestWithBody<FeedBackCreateModel>,
    res: Response<any | null>
  ) => {
    const result = await feedbackServises.sendFeedback(_req.body.comment, _req.body.user_id, _req.body.course_id);
    return res.status(HTTP_STATUSES.CREATED).json(result);
  }
);