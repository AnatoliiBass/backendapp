import express, { Request, Response } from 'express'
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

const db ={
    courses: [
        {
            id: 1,
            name: 'front-end'
        },
        {
            id: 2,
            name: 'back-end'
        },
        {
            id: 3,
            name: 'devops'
        },
        {
            id: 4,
            name: 'fullstack'
        }
    ]

}

app.get('/', (_req: Request, res: Response) => res.status(HTTP_STATUSES.OK).send('Hello World!!!!!'));

app.get('/courses', (_req: Request, res: Response) => {
    let courses = db.courses;
    if(_req.query.name){
        courses = courses.filter(course => course.name.includes(_req.query.name as string))
    }
    return res.status(HTTP_STATUSES.OK).json(courses);
});

app.get('/courses/:id', (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if(!course){
        return res.status(HTTP_STATUSES.NOT_FOUND).send('Course not found');
    }
    return res.status(HTTP_STATUSES.OK).json(course);
});

app.delete('/courses/:id', (_req: Request, res: Response) => {
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

app.post('/courses', (_req: Request, res: Response) => {
    if(!_req.body.name){
       return res.status(HTTP_STATUSES.BAD_REQUEST).send('Name is required');
    }
    const newCourse = {
        id: db.courses.length + 1,
        name: _req.body.name
    };
    db.courses.push(newCourse);
    return res.status(HTTP_STATUSES.CREATED).json(newCourse);
});

app.put('/courses/:id', (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if(!course){
        return res.status(HTTP_STATUSES.NOT_FOUND).send('Course not found');
    }
    if(!_req.body.name){
        return res.status(HTTP_STATUSES.BAD_REQUEST).send('Name is required');
    }
    course.name = _req.body.name;
    return res.status(HTTP_STATUSES.CREATED).json(course);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
