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
const getViewModel_1 = require("../utils/getViewModel");
exports.coursesRepositoryQueries = {
    getAllCourses: (name) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        let filter = {};
        if (name) {
            filter = { name: { $regex: name } };
        }
        const getCourses = yield db_1.courses.find(filter).toArray();
        const coursesWithAuthor = [];
        console.log("getCourses: ", getCourses);
        try {
            for (var _d = true, getCourses_1 = __asyncValues(getCourses), getCourses_1_1; getCourses_1_1 = yield getCourses_1.next(), _a = getCourses_1_1.done, !_a; _d = true) {
                _c = getCourses_1_1.value;
                _d = false;
                const course = _c;
                const author = yield db_1.authors.findOne({ id: course.author_id });
                if (author) {
                    coursesWithAuthor.push((0, getViewModel_1.getViewModel)(course, author));
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