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
exports.authorsRepositoryQueries = void 0;
const db_1 = require("../db/db");
const getViewModelAuthor_1 = require("../utils/getViewModelAuthor");
exports.authorsRepositoryQueries = {
    getAllAuthors: (name) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        let filter = {};
        if (name) {
            filter = {
                $or: [
                    { first_name: { $regex: name } },
                    { last_name: { $regex: name } },
                ],
            };
        }
        const getAuthors = yield db_1.authors.find(filter).toArray();
        const authorsWithCourses = [];
        if (getAuthors.length > 0) {
            try {
                for (var _d = true, getAuthors_1 = __asyncValues(getAuthors), getAuthors_1_1; getAuthors_1_1 = yield getAuthors_1.next(), _a = getAuthors_1_1.done, !_a; _d = true) {
                    _c = getAuthors_1_1.value;
                    _d = false;
                    const author = _c;
                    const course = yield db_1.courses.find({ author_id: author.id }).toArray();
                    if (author) {
                        authorsWithCourses.push((0, getViewModelAuthor_1.getViewModelAuthor)(course, author));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = getAuthors_1.return)) yield _b.call(getAuthors_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return authorsWithCourses;
    }),
    getAuthorById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const getAuthor = yield db_1.authors.findOne({ id });
        if (!getAuthor) {
            return null;
        }
        const course = yield db_1.courses.find({ author_id: getAuthor.id }).toArray();
        return (0, getViewModelAuthor_1.getViewModelAuthor)(course, getAuthor);
    }),
    getAuthorByFullName: (first_name, last_name) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, e_2, _f, _g;
        const getAuthors = yield db_1.authors.find({ first_name, last_name }).toArray();
        const authorsWithCourses = [];
        if (getAuthors.length > 0) {
            try {
                for (var _h = true, getAuthors_2 = __asyncValues(getAuthors), getAuthors_2_1; getAuthors_2_1 = yield getAuthors_2.next(), _e = getAuthors_2_1.done, !_e; _h = true) {
                    _g = getAuthors_2_1.value;
                    _h = false;
                    const author = _g;
                    const course = yield db_1.courses.find({ author_id: author.id }).toArray();
                    if (author) {
                        authorsWithCourses.push((0, getViewModelAuthor_1.getViewModelAuthor)(course, author));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_h && !_e && (_f = getAuthors_2.return)) yield _f.call(getAuthors_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return authorsWithCourses;
    }),
};
//# sourceMappingURL=authorsFromDBQueries.js.map