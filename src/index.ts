import express, { type Request, type Response } from 'express'
import type { Course, DbCourses, RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from './types';
import type { CourseGetWithQueryModel } from './models/CourseGetWithQueryModel';
import type { CourseCreateModel } from './models/CourseCreateModel';
import type { CourseUpdateModel } from './models/CourseUpdateModel';
import type { CourseViewModel } from './models/CourseViewModel';
import type { CourseURIParamsModel } from './models/CourseURIParamsModel';

export const app = express();
const port = process.env.PORT || 3003;

export const HTTP_STATUSES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
}

const jsonParser = express.json();
app.use(jsonParser);

const db: DbCourses ={
    courses: [
        {
            id: 1,
            name: 'front-end',
            studentsAmount: 10
        },
        {
            id: 2,
            name: 'back-end',
            studentsAmount: 20
        },
        {
            id: 3,
            name: 'devops',
            studentsAmount: 30
        },
        {
            id: 4,
            name: 'fullstack',
            studentsAmount: 40
        }
    ]

}

export function getViewModel(course: Course): CourseViewModel{
    return {id: course.id, name: course.name};
}

app.get('/', (_req: Request, res: Response) => res.status(HTTP_STATUSES.OK).send('Hello World!!!!!'));

app.get('/courses', (_req: RequestWithQuery<CourseGetWithQueryModel>, res: Response<CourseViewModel[]>) => {
    let courses = db.courses;
    if(_req.query.name){
        courses = courses.filter(course => course.name.includes(_req.query.name))
    }
    return res.status(HTTP_STATUSES.OK).json(courses.map(getViewModel));
});

app.get('/courses/:id', (_req: RequestWithParams<CourseURIParamsModel>, res: Response<CourseViewModel | null>) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if(!course){
        res.statusCode = HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = 'Course not found';
        return res.json(null);
    }
    return res.status(HTTP_STATUSES.OK).json(getViewModel(course));
});

app.delete('/courses/:id', (_req: RequestWithParams<CourseURIParamsModel>, res: Response) => {
    const id = parseInt(_req.params.id);
    const index = db.courses.findIndex(course => course.id === id);
    if(index === -1){
        return res.status(HTTP_STATUSES.NOT_FOUND).send('Course not found');
    }
    db.courses.splice(index, 1);
    return res.status(HTTP_STATUSES.NO_CONTENT).send('Course deleted');
});

app.delete('/testdelete', (_req: Request, res: Response) => {
    db.courses = [];
    return res.status(HTTP_STATUSES.NO_CONTENT).send('Courses deleted');
});

app.post('/courses', (_req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel | null>) => {
    if(!_req.body.name || _req.body.name === ''){
       res.statusCode = HTTP_STATUSES.BAD_REQUEST;
       res.statusMessage = 'Name is required';
       return res.json(null);
    }
    const newCourse = {
        id: new Date().getTime(),
        name: _req.body.name,
        studentsAmount: 0
    };
    db.courses.push(newCourse);
    return res.status(HTTP_STATUSES.CREATED).json(getViewModel(newCourse));
});

app.put('/courses/:id', (_req: RequestWithParamsAndBody<CourseURIParamsModel, CourseUpdateModel>, res: Response<CourseViewModel | null>) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if(!course){
        res.statusCode = HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = 'Course not found';
        return res.json(null);
    }
    if(!_req.body.name || _req.body.name === ''){
        res.statusCode = HTTP_STATUSES.BAD_REQUEST;
        res.statusMessage = 'Name is required';
        return res.json(null);
    }
    course.name = _req.body.name;
    return res.status(HTTP_STATUSES.CREATED).json(getViewModel(course));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
