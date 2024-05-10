"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const courses_1 = require("./routes/courses");
const httpstatuses_1 = require("./utils/httpstatuses");
const authors_1 = require("./routes/authors");
exports.app = (0, express_1.default)();
const jsonParser = express_1.default.json();
exports.app.use(jsonParser);
exports.app.get('/', (_req, res) => res.status(httpstatuses_1.HTTP_STATUSES.OK).send('Hello World!!!!!'));
exports.app.use('/courses', courses_1.coursesRouter);
exports.app.use('/authors', authors_1.authorsRouter);
//# sourceMappingURL=app.js.map