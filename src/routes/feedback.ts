import { Router } from "express";
import type { Response } from "express";
import type { RequestWithBody, Comment } from "../types";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import { commentValidator } from "../utils/helpersValidator";
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
    res: Response<{newToken: string | null, feedback: Comment} | null>
  ) => {
    const result = await feedbackServises.sendFeedback(_req.body.comment, _req.body.user_id, _req.body.course_id);
    return res.status(HTTP_STATUSES.CREATED).json({feedback: result, newToken: _req.body.newToken});
  }
);