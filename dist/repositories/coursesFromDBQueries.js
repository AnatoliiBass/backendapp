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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRepositoryQueries = void 0;
const db_1 = require("../db/db");
const getViewModelCourse_1 = require("../utils/getViewModelCourse");
const constants_1 = require("../constants");
exports.coursesRepositoryQueries = {
    getAllCourses: (name, page, per_page, sort_by, sort_order) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        let filter = {};
        let sort = {};
        if (sort_by || (sort_order && sort_order.toLowerCase() === "desc")) {
            if (constants_1.COURSE_KEYS.includes(sort_by)) {
                sort = { [sort_by]: sort_order === "desc" ? -1 : 1 };
            }
            else {
                sort = { _id: sort_order === "desc" ? -1 : 1 };
            }
        }
        if (name) {
            filter = { name: { $regex: name } };
        }
        const getCourses = yield db_1.courses.find(filter).sort(sort).toArray();
        const total = yield db_1.courses.countDocuments(filter);
        const correctPage = parseInt(page) && parseInt(page) > 0 ? parseInt(page) : constants_1.PAGE;
        const correctPerPage = parseInt(per_page) && parseInt(per_page) > 0 ? parseInt(per_page) : constants_1.PER_PAGE;
        const coursesWithAuthor = [];
        if (getCourses.length > 0) {
            try {
                for (var _d = true, getCourses_1 = __asyncValues(getCourses), getCourses_1_1; getCourses_1_1 = yield getCourses_1.next(), _a = getCourses_1_1.done, !_a; _d = true) {
                    _c = getCourses_1_1.value;
                    _d = false;
                    const course = _c;
                    const author = yield db_1.authors.findOne({ id: course.author_id });
                    if (author) {
                        coursesWithAuthor.push((0, getViewModelCourse_1.getViewModelCourse)(course, author));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = getCourses_1.return)) yield _b.call(getCourses_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (coursesWithAuthor.length === 0 || correctPage > Math.ceil(total / correctPerPage)) {
            return null;
        }
        return { courses: coursesWithAuthor
                .slice((correctPage - 1) * correctPerPage, ((correctPage - 1) * correctPerPage) + correctPerPage),
            total: Math.ceil(total / correctPerPage), page: correctPage, per_page: correctPerPage };
    }),
    getCourseById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const getCourse = yield db_1.courses.findOne({ id });
        if (!getCourse) {
            return null;
        }
        const author = yield db_1.authors.findOne({ id: getCourse.author_id });
        return (0, getViewModelCourse_1.getViewModelCourse)(getCourse, author);
    }),
};
//# sourceMappingURL=coursesFromDBQueries.js.map