"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = require("express");
const httpstatuses_1 = require("../utils/httpstatuses");
const courses_1 = require("../repositories/courses");
exports.coursesRouter = (0, express_1.Router)();
exports.coursesRouter.get("/", (_req, res) => {
    const courses = courses_1.coursesRepository.getAllCourses(_req.query.name);
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(courses);
});
exports.coursesRouter.get("/:id(\\d+)", (_req, res) => {
    const course = courses_1.coursesRepository.getCourseById(+_req.params.id);
    if (!course) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = "Course not found";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(course);
});
exports.coursesRouter.delete("/:id(\\d+)", (_req, res) => {
    const isDeleted = courses_1.coursesRepository.deleteCourse(+_req.params.id);
    if (!isDeleted) {
        return res.status(httpstatuses_1.HTTP_STATUSES.NOT_FOUND).send("Course not found");
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.NO_CONTENT).send("Course deleted");
});
exports.coursesRouter.post("/", (_req, res) => {
    if (!_req.body.name || _req.body.name === "") {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.BAD_REQUEST;
        res.statusMessage = "Name is required";
        return res.json(null);
    }
    const newCourse = courses_1.coursesRepository.createCourse(_req.body.name);
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(newCourse);
});
exports.coursesRouter.put("/:id(\\d+)", (_req, res) => {
    if (!_req.body.name || _req.body.name === "") {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.BAD_REQUEST;
        res.statusMessage = "Name is required";
        return res.json(null);
    }
    const course = courses_1.coursesRepository.updateCourse(+_req.params.id, _req.body.name);
    if (!course) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = "Course not found";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(course);
});
//# sourceMappingURL=courses.js.map