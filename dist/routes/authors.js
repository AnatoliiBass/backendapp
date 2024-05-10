"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsRouter = void 0;
const express_1 = require("express");
const httpstatuses_1 = require("../utils/httpstatuses");
const authorsFromDBQueries_1 = require("../repositories/authorsFromDBQueries");
exports.authorsRouter = (0, express_1.Router)();
exports.authorsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authors = yield authorsFromDBQueries_1.authorsRepositoryQueries.getAllAuthors(_req.query.name);
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(authors);
}));
exports.authorsRouter.get("/:id(\\d+)", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield authorsFromDBQueries_1.authorsRepositoryQueries.getAuthorById(+_req.params.id);
    if (!author) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = "Author not found";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(author);
}));
//# sourceMappingURL=authors.js.map