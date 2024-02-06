"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3003;
exports.HTTP_STATUSES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
};
const jsonParser = express_1.default.json();
exports.app.use(jsonParser);
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
exports.app.get('/', (_req, res) => res.status(exports.HTTP_STATUSES.OK).send('Hello World!!!!!'));
exports.app.get('/courses', (_req, res) => {
    let courses = db.courses;
    if (_req.query.name) {
        courses = courses.filter(course => course.name.includes(_req.query.name));
    }
    return res.status(exports.HTTP_STATUSES.OK).json(courses);
});
exports.app.get('/courses/:id', (_req, res) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if (!course) {
        return res.status(exports.HTTP_STATUSES.NOT_FOUND).send('Course not found');
    }
    return res.status(exports.HTTP_STATUSES.OK).json(course);
});
exports.app.delete('/courses/:id', (_req, res) => {
    const id = parseInt(_req.params.id);
    const index = db.courses.findIndex(course => course.id === id);
    if (index === -1) {
        return res.status(exports.HTTP_STATUSES.NOT_FOUND).send('Course not found');
    }
    db.courses.splice(index, 1);
    return res.status(exports.HTTP_STATUSES.NO_CONTENT).send('Course deleted');
});
exports.app.delete('/testdelete', (_req, res) => {
    db.courses = [];
    return res.status(exports.HTTP_STATUSES.NO_CONTENT).send('Courses deleted');
});
exports.app.post('/courses', (_req, res) => {
    if (!_req.body.name) {
        return res.status(exports.HTTP_STATUSES.BAD_REQUEST).send('Name is required');
    }
    const newCourse = {
        id: db.courses.length + 1,
        name: _req.body.name
    };
    db.courses.push(newCourse);
    return res.status(exports.HTTP_STATUSES.CREATED).json(newCourse);
});
exports.app.put('/courses/:id', (_req, res) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if (!course) {
        return res.status(exports.HTTP_STATUSES.NOT_FOUND).send('Course not found');
    }
    if (!_req.body.name) {
        return res.status(exports.HTTP_STATUSES.BAD_REQUEST).send('Name is required');
    }
    course.name = _req.body.name;
    return res.status(exports.HTTP_STATUSES.CREATED).json(course);
});
exports.app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map