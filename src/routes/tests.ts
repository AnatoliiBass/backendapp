import express from 'express'
import type { Request, Response } from "express";
import type { DbCourses } from "../types";
import { HTTP_STATUSES } from "../utils/httpstatuses";


export const getTestsRoute = (db: DbCourses) => {
    const router = express.Router();  

  router.delete("/", (_req: Request, res: Response) => {
    db.courses = [];
    return res.status(HTTP_STATUSES.NO_CONTENT).send("Courses deleted");
  });

  return router;
};
