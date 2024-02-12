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
exports.coursesRepositoryQueries = void 0;
const db_1 = require("../db/db");
const getViewModel_1 = require("../utils/getViewModel");
exports.coursesRepositoryQueries = {
    getAllCourses: (name) => __awaiter(void 0, void 0, void 0, function* () {
        let filter = {};
        if (name) {
            filter = { name: { $regex: name } };
        }
        const getCourses = yield db_1.courses.find(filter).toArray();
        const coursesWithAuthor = [];
        getCourses.forEach((course) => __awaiter(void 0, void 0, void 0, function* () {
            const author = yield db_1.authors.findOne({ id: course.author_id });
            coursesWithAuthor.push((0, getViewModel_1.getViewModel)(course, author));
        }));
        return coursesWithAuthor;
    }),
    getCourseById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const getCourse = yield db_1.courses.findOne({ id });
        if (!getCourse) {
            return null;
        }
        const author = yield db_1.authors.findOne({ id: getCourse.author_id });
        return (0, getViewModel_1.getViewModel)(getCourse, author);
    })
};
//# sourceMappingURL=coursesFromDBQueries.js.map