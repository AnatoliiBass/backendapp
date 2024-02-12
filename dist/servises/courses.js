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
exports.coursesServises = {
    deleteCourse: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield coursesFromDBCommand_1.coursesRepositoryCommand.deleteCourse(id);
    }),
    createCourse: (name) => __awaiter(void 0, void 0, void 0, function* () {
        const newCourse = {
            id: new Date().getTime(),
            name,
            studentsAmount: 0,
            author_id: 123
        };
        return yield coursesFromDBCommand_1.coursesRepositoryCommand.createCourse(newCourse);
    }),
    updateCourse: (id, name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield coursesFromDBCommand_1.coursesRepositoryCommand.updateCourse(id, name);
    })
};
//# sourceMappingURL=courses.js.map