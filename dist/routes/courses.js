"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = require("express");
const httpstatuses_1 = require("../utils/httpstatuses");
const courses_1 = require("../servises/courses");
const helpersValidator_1 = require("../utils/helpersValidator");
const validation_1 = require("../middelwares/validation");
const coursesFromDBQueries_1 = require("../repositories/coursesFromDBQueries");
exports.coursesRouter = (0, express_1.Router)();
exports.coursesRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield coursesFromDBQueries_1.coursesRepositoryQueries.getAllCourses(_req.query.name, _req.query.page, _req.query.per_page, _req.query.sort_by, _req.query.sort_order);
    if (!courses) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = "Courses not found";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(courses);
}));
exports.coursesRouter.get("/:id(\\d+)", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield coursesFromDBQueries_1.coursesRepositoryQueries.getCourseById(+_req.params.id);
    if (!course) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = "Course not found";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(course);
}));
exports.coursesRouter.delete("/:id(\\d+)", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield courses_1.coursesServises.deleteCourse(+_req.params.id);
    if (!isDeleted) {
        return res.status(httpstatuses_1.HTTP_STATUSES.NOT_FOUND).send("Course not found");
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.NO_CONTENT).send("Course deleted");
}));
exports.coursesRouter.post("/", helpersValidator_1.nameValidator, helpersValidator_1.firstNameValidator, helpersValidator_1.lastNameValidator, validation_1.coursesValidation, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = yield courses_1.coursesServises.createCourse(_req.body.name, _req.body.author_first_name, _req.body.author_last_name);
    if (!newCourse) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.DATA_EXISTS;
        res.statusMessage = "Course already exists";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(newCourse);
}));
exports.coursesRouter.put("/:id(\\d+)", helpersValidator_1.nameValidator, validation_1.coursesValidation, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courses_1.coursesServises.updateCourse(+_req.params.id, _req.body.name);
    if (!course) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.NOT_FOUND;
        res.statusMessage = "Course not found";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(course);
}));
//# sourceMappingURL=courses.js.map