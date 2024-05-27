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
exports.coursesServises = void 0;
const coursesFromDBCommand_1 = require("../repositories/coursesFromDBCommand");
const authorsFromDBQueries_1 = require("../repositories/authorsFromDBQueries");
const authorsFromDBCommand_1 = require("../repositories/authorsFromDBCommand");
const coursesFromDBQueries_1 = require("../repositories/coursesFromDBQueries");
exports.coursesServises = {
    deleteCourse: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield coursesFromDBCommand_1.coursesRepositoryCommand.deleteCourse(id);
    }),
    createCourse: (name, author_first_name, author_last_name) => __awaiter(void 0, void 0, void 0, function* () {
        let author_id = 0;
        const authors = yield authorsFromDBQueries_1.authorsRepositoryQueries.getAuthorByFullName(author_first_name, author_last_name);
        if (authors.length > 0) {
            if (authors[0].courses.some(course => course.name.toLowerCase() === name.toLowerCase())) {
                return null;
            }
            else {
                author_id = authors[0].id;
            }
        }
        else {
            const newAuthor = yield authorsFromDBCommand_1.authorsRepositoryCommand.createAuthor({ id: new Date().getTime(), first_name: author_first_name, last_name: author_last_name });
            if (newAuthor) {
                author_id = newAuthor.id;
            }
        }
        const newCourse = {
            id: new Date().getTime(),
            name,
            usersAmount: 0,
            author_id,
            comments: []
        };
        return yield coursesFromDBCommand_1.coursesRepositoryCommand.createCourse(newCourse);
    }),
    updateCourse: (id, name, comments) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield coursesFromDBQueries_1.coursesRepositoryQueries.getCourseById(id);
        return yield coursesFromDBCommand_1.coursesRepositoryCommand.updateCourse(id, name || course.name, comments || (course === null || course === void 0 ? void 0 : course.comments) || []);
    })
};
//# sourceMappingURL=courses.js.map