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
const users_1 = require("./routes/users");
const auth_1 = require("./routes/auth");
const feedback_1 = require("./routes/feedback");
const email_1 = require("./routes/email");
exports.app = (0, express_1.default)();
const jsonParser = express_1.default.json();
exports.app.use(jsonParser);
exports.app.get('/', (_req, res) => res.status(httpstatuses_1.HTTP_STATUSES.OK).send('Hello World!!!!!'));
exports.app.use('/courses', courses_1.coursesRouter);
exports.app.use('/authors', authors_1.authorsRouter);
exports.app.use('/users', users_1.usersRouter);
exports.app.use('/auth', auth_1.authRouter);
exports.app.use('/feedback', feedback_1.feedbackRouter);
exports.app.use('/email', email_1.emailRouter);
//# sourceMappingURL=app.js.map