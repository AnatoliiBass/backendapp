"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesRoute = void 0;
const express_1 = __importDefault(require("express"));
const httpstatuses_1 = require("../utils/httpstatuses");
const getViewModel_1 = require("../utils/getViewModel");
const getCoursesRoute = (db) => {
    const router = express_1.default.Router();
    router.get('/', (_req, res) => {
        let courses = db.courses;
        if (_req.query.name) {
            courses = courses.filter(course => course.name.includes(_req.query.name));
        }
        return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(courses.map(getViewModel_1.getViewModel));
    });
    router.get('/:id(\\d+)', (_req, res) => {
        const id = parseInt(_req.params.id);
        const course = db.courses.find(course => course.id === id);
        if (!course) {
            res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
            res.statusMessage = 'Course not found';
            return res.json(null);
        }
        return res.status(httpstatuses_1.HTTP_STATUSES.OK).json((0, getViewModel_1.getViewModel)(course));
    });
    router.delete('/:id(\\d+)', (_req, res) => {
        const id = parseInt(_req.params.id);
        const index = db.courses.findIndex(course => course.id === id);
        if (index === -1) {
            return res.status(httpstatuses_1.HTTP_STATUSES.NOT_FOUND).send('Course not found');
        }
        db.courses.splice(index, 1);
        return res.status(httpstatuses_1.HTTP_STATUSES.NO_CONTENT).send('Course deleted');
    });
    router.post('/', (_req, res) => {
        if (!_req.body.name || _req.body.name === '') {
            res.statusCode = httpstatuses_1.HTTP_STATUSES.BAD_REQUEST;
            res.statusMessage = 'Name is required';
            return res.json(null);
        }
        const newCourse = {
            id: new Date().getTime(),
            name: _req.body.name,
            studentsAmount: 0
        };
        db.courses.push(newCourse);
        return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json((0, getViewModel_1.getViewModel)(newCourse));
    });
    router.put('/:id(\\d+)', (_req, res) => {
        const id = parseInt(_req.params.id);
        const course = db.courses.find(course => course.id === id);
        if (!course) {
            res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
            res.statusMessage = 'Course not found';
            return res.json(null);
        }
        if (!_req.body.name || _req.body.name === '') {
            res.statusCode = httpstatuses_1.HTTP_STATUSES.BAD_REQUEST;
            res.statusMessage = 'Name is required';
            return res.json(null);
        }
        course.name = _req.body.name;
        return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json((0, getViewModel_1.getViewModel)(course));
    });
    return router;
};
exports.getCoursesRoute = getCoursesRoute;
//# sourceMappingURL=courses.js.map