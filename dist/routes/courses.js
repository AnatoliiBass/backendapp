"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = require("express");
const httpstatuses_1 = require("../utils/httpstatuses");
const courses_1 = require("../repositories/courses");
const helpersValidator_1 = require("../utils/helpersValidator");
const validation_1 = require("../middelwares/validation");
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
exports.coursesRouter.post("/", helpersValidator_1.nameValidator, validation_1.coursesValidation, (_req, res) => {
    const newCourse = courses_1.coursesRepository.createCourse(_req.body.name);
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(newCourse);
});
exports.coursesRouter.put("/:id(\\d+)", helpersValidator_1.nameValidator, validation_1.coursesValidation, (_req, res) => {
    const course = courses_1.coursesRepository.updateCourse(+_req.params.id, _req.body.name);
    if (!course) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = "Course not found";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(course);
});
//# sourceMappingURL=courses.js.map