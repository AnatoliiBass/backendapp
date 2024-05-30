import { Router } from "express";
import type { Response } from "express";
import type { RequestWithBody, RequestWithQuery } from "../types";
import type { EmailModel } from "../models/EmailModel";
import { userEmailValidator } from "../utils/helpersValidator";
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
  "/confirm",
  userEmailValidator,
  async (
    _req: RequestWithQuery<{code: string, id: string}>,
    res: Response<boolean>
  ) => {
    console.log("Request in emailRouter: ", _req.query.code, parseInt(_req.query.id));
    const result = await emailServices.confirmEmail(_req.query.code, parseInt(_req.query.id));
    return res.status(HTTP_STATUSES.OK).json(result);
  }
);