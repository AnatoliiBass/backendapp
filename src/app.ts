import express, { type Request, type Response } from 'express'
import { coursesRouter } from './routes/courses';
import { HTTP_STATUSES } from './utils/httpstatuses';
import { authorsRouter } from './routes/authors';
import { usersRouter } from './routes/users';
import { authRouter } from './routes/auth';
import { feedbackRouter } from './routes/feedback';
import { emailRouter } from './routes/email';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { setting } from './setting';

export const app = express();

const jsonParser = express.json();
app.use(cookieParser());
app.use(jsonParser);
// app.use(cors({ origin: setting.CLIENT_URL, credentials: true }));

app.get('/', (_req: Request, res: Response) => res.status(HTTP_STATUSES.OK).send('Hello World!!!!!'));

app.use('/courses', coursesRouter);
app.use('/authors', authorsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/feedback', feedbackRouter);
app.use('/email', emailRouter);
