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
exports.coursesRepository = void 0;
const db_1 = require("../db/db");
const getViewModel_1 = require("../utils/getViewModel");
exports.coursesRepository = {
    getAllCourses: (name) => __awaiter(void 0, void 0, void 0, function* () {
        let courses = db_1.db.courses;
        if (name) {
            courses = courses.filter(course => course.name.includes(name));
        }
        return courses.map(getViewModel_1.getViewModel);
    }),
    getCourseById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const course = db_1.db.courses.find(course => course.id === id);
        if (!course) {
            return null;
        }
        return (0, getViewModel_1.getViewModel)(course);
    }),
    deleteCourse: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const index = db_1.db.courses.findIndex(course => course.id === id);
        if (index === -1) {
            return false;
        }
        db_1.db.courses.splice(index, 1);
        return true;
    }),
    createCourse: (name) => __awaiter(void 0, void 0, void 0, function* () {
        const newCourse = {
            id: new Date().getTime(),
            name,
            studentsAmount: 0
        };
        db_1.db.courses.push(newCourse);
        return (0, getViewModel_1.getViewModel)(newCourse);
    }),
    updateCourse: (id, name) => __awaiter(void 0, void 0, void 0, function* () {
        const course = db_1.db.courses.find(course => course.id === id);
        if (!course) {
            return null;
        }
        course.name = name;
        return (0, getViewModel_1.getViewModel)(course);
    })
};
//# sourceMappingURL=courses.js.map