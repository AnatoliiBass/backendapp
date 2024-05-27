import { Router } from "express";
import type { Response } from "express";
import type { RequestWithBody } from "../types";
import type { EmailModel } from "../models/EmailModel";

export const emailRouter = Router();

emailRouter.post(
  "/send",
  async (
    _req: RequestWithBody<EmailModel>,
    res: Response<EmailModel>
  ) => {
    res.send({
        email: _req.body.email,
        subject: _req.body.subject,
        message: _req.body.message
    })
  }
);