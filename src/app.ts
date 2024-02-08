import express, { type Request, type Response } from 'express'
import { coursesRouter } from './routes/courses';
import { getTestsRoute } from './routes/tests';
import { db } from './db/db';
import { HTTP_STATUSES } from './utils/httpstatuses';

export const app = express();

const jsonParser = express.json();
app.use(jsonParser);

app.get('/', (_req: Request, res: Response) => res.status(HTTP_STATUSES.OK).send('Hello World!!!!!'));

app.use('/courses', coursesRouter);
app.use('/tests', getTestsRoute(db));