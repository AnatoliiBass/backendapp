import { Router } from "express";
import type { Response } from "express";
import type { RequestWithBody } from "../types";
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
    console.log("Result", result);
    if (!result) {
      res.statusCode = HTTP_STATUSES.BAD_REQUEST;
      res.statusMessage = "Email not sent";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.OK).json(result);
  }
);