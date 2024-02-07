"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewModel = exports.HTTP_STATUSES = exports.app = void 0;
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
};
function getViewModel(course) {
    return { id: course.id, name: course.name };
}
exports.getViewModel = getViewModel;
exports.app.get('/', (_req, res) => res.status(exports.HTTP_STATUSES.OK).send('Hello World!!!!!'));
exports.app.get('/courses', (_req, res) => {
    let courses = db.courses;
    if (_req.query.name) {
        courses = courses.filter(course => course.name.includes(_req.query.name));
    }
    return res.status(exports.HTTP_STATUSES.OK).json(courses.map(getViewModel));
});
exports.app.get('/courses/:id', (_req, res) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if (!course) {
        res.statusCode = exports.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = 'Course not found';
        return res.json(null);
    }
    return res.status(exports.HTTP_STATUSES.OK).json(getViewModel(course));
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
    if (!_req.body.name || _req.body.name === '') {
        res.statusCode = exports.HTTP_STATUSES.BAD_REQUEST;
        res.statusMessage = 'Name is required';
        return res.json(null);
    }
    const newCourse = {
        id: new Date().getTime(),
        name: _req.body.name,
        studentsAmount: 0
    };
    db.courses.push(newCourse);
    return res.status(exports.HTTP_STATUSES.CREATED).json(getViewModel(newCourse));
});
exports.app.put('/courses/:id', (_req, res) => {
    const id = parseInt(_req.params.id);
    const course = db.courses.find(course => course.id === id);
    if (!course) {
        res.statusCode = exports.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = 'Course not found';
        return res.json(null);
    }
    if (!_req.body.name || _req.body.name === '') {
        res.statusCode = exports.HTTP_STATUSES.BAD_REQUEST;
        res.statusMessage = 'Name is required';
        return res.json(null);
    }
    course.name = _req.body.name;
    return res.status(exports.HTTP_STATUSES.CREATED).json(getViewModel(course));
});
exports.app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map