import express, { type Request, type Response } from 'express'
import { coursesRouter } from './routes/courses';
import { HTTP_STATUSES } from './utils/httpstatuses';
import { authorsRouter } from './routes/authors';

export const app = express();

const jsonParser = express.json();
app.use(jsonParser);

app.get('/', (_req: Request, res: Response) => res.status(HTTP_STATUSES.OK).send('Hello World!!!!!'));

app.use('/courses', coursesRouter);
app.use('/authors', authorsRouter);
