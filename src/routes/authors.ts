import { Router } from "express";
import type { Response } from "express";
import type {
  RequestWithParams,
  RequestWithQuery,
} from "../types";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import { AuthorViewModel } from "../models/AuthorViewModel";
import { authorsRepositoryQueries } from "../repositories/authorsFromDBQueries";
import { AuthorGetWithQueryModel } from "../models/AuthorGetWithQueryModel";
import { AuthorURIParamsModel } from "../models/AuthorURIParamsModel";

export const authorsRouter = Router();
authorsRouter.get(
  "/",
  async (
    _req: RequestWithQuery<AuthorGetWithQueryModel>,
    res: Response<AuthorViewModel[]>
  ) => {
    const authors = await authorsRepositoryQueries.getAllAuthors(_req.query.name);
    return res.status(HTTP_STATUSES.OK).json(authors);
  }
);

authorsRouter.get(
  "/:id(\\d+)",
  async (
    _req: RequestWithParams<AuthorURIParamsModel>,
    res: Response<AuthorViewModel | null>
  ) => {
    const author = await authorsRepositoryQueries.getAuthorById(+_req.params.id);
    if (!author) {
      res.statusCode = HTTP_STATUSES.NOT_FOUND;
      res.statusMessage = "Author not found";
      return res.json(null);
    }
    return res.status(HTTP_STATUSES.OK).json(author);
  }
);