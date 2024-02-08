"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRepository = void 0;
const db_1 = require("../db/db");
const getViewModel_1 = require("../utils/getViewModel");
exports.coursesRepository = {
    getAllCourses: (name) => {
        let courses = db_1.db.courses;
        if (name) {
            courses = courses.filter(course => course.name.includes(name));
        }
        return courses.map(getViewModel_1.getViewModel);
    },
    getCourseById: (id) => {
        const course = db_1.db.courses.find(course => course.id === id);
        if (!course) {
            return null;
        }
        return (0, getViewModel_1.getViewModel)(course);
    },
    deleteCourse: (id) => {
        const index = db_1.db.courses.findIndex(course => course.id === id);
        if (index === -1) {
            return false;
        }
        db_1.db.courses.splice(index, 1);
        return true;
    },
    createCourse: (name) => {
        const newCourse = {
            id: new Date().getTime(),
            name,
            studentsAmount: 0
        };
        db_1.db.courses.push(newCourse);
        return (0, getViewModel_1.getViewModel)(newCourse);
    },
    updateCourse: (id, name) => {
        const course = db_1.db.courses.find(course => course.id === id);
        if (!course) {
            return null;
        }
        course.name = name;
        return (0, getViewModel_1.getViewModel)(course);
    }
};
//# sourceMappingURL=courses.js.map