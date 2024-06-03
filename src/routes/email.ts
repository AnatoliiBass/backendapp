import { Router } from "express";
import type { Response } from "express";
import type { RequestWithBody, RequestWithQuery } from "../types";
import type { EmailModel } from "../models/EmailModel";
import { userCodeValidator, userEmailValidator } from "../utils/helpersValidator";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import { emailServices } from "../servises/email";

export const emailRouter = Router();

emailRouter.post(
  "/send",
  userEmailValidator,
  async (
    _req: RequestWithBody<EmailModel>,
    res: Response<any | null>
  ) => {
    const result = await emailServices.sendEmail(_req.body.email, _req.body.subject, _req.body.message);
    if (result.data === null && result.error !== null) {
      res.statusCode = HTTP_STATUSES.BAD_REQUEST;
      res.statusMessage = "Email not sent";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.OK).json(result);
  }
);

emailRouter.post(
  "/confirmEmail",
  userCodeValidator,
  async (
    _req: RequestWithQuery<{code: string}>,
    res: Response<boolean>
  ) => {
    const result = await emailServices.confirmEmail(_req.query.code);
    return res.status(HTTP_STATUSES.OK).json(result);
  }
);

emailRouter.post(
  "/sendResetPassword",
  userEmailValidator,
  async (
    _req: RequestWithBody<{email: string}>,
    res: Response<boolean>
  ) => {
    const result = await emailServices.sendResetPassword(_req.body.email);
    if (!result) {
      res.statusCode = HTTP_STATUSES.BAD_REQUEST;
      res.statusMessage = "Email not sent. Please, try again after 5 min or your user is blocked(after 5 times).";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.OK).json(result);
  }
);

emailRouter.post(
  "/confirmResetPasswordEmail",
  userCodeValidator,
  async (
    _req: RequestWithQuery<{code: string}>,
    res: Response<boolean>
  ) => {
    const result = await emailServices.confirmResetPassword(_req.query.code);
    return res.status(HTTP_STATUSES.OK).json(result);
  }
);
