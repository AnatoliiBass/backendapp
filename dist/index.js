"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
const jsonParser = express_1.default.json();
app.use(jsonParser);
const db = {
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
};
app.get('/', (_req, res) => res.status(200).send('Hello World!'));
app.get('/courses', (_req, res) => {
    let courses = db.courses;
    if (_req.query.name) {
        courses = courses.filter(course => course.name.includes(_req.query.name));
    }
    return res.status(200).json(courses);
});
app.get('/courses/:id', (_req, res) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if (!course) {
        return res.status(404).send('Course not found');
    }
    return res.status(200).json(course);
});
app.delete('/courses/:id', (_req, res) => {
    const id = parseInt(_req.params.id);
    const index = db.courses.findIndex(course => course.id === id);
    if (index === -1) {
        return res.status(404).send('Course not found');
    }
    db.courses.splice(index, 1);
    return res.status(204).send('Course deleted');
});
app.post('/courses', (_req, res) => {
    if (!_req.body.name) {
        return res.status(400).send('Name is required');
    }
    const newCourse = {
        id: db.courses.length + 1,
        name: _req.body.name
    };
    db.courses.push(newCourse);
    return res.status(201).json(newCourse);
});
app.put('/courses/:id', (_req, res) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if (!course) {
        return res.status(404).send('Course not found');
    }
    if (!_req.body.name) {
        return res.status(400).send('Name is required');
    }
    course.name = _req.body.name;
    return res.status(201).json(course);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map