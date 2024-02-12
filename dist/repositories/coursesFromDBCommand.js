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
exports.coursesRepositoryCommand = void 0;
const db_1 = require("../db/db");
const getViewModel_1 = require("../utils/getViewModel");
exports.coursesRepositoryCommand = {
    deleteCourse: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.courses.deleteOne({ id });
        return result.deletedCount === 1;
    }),
    createCourse: (course) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.courses.insertOne(course);
        console.log("Created result: ", result);
        return (0, getViewModel_1.getViewModel)(course);
    }),
    updateCourse: (id, name) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.courses.updateOne({ id }, { $set: { name } });
        if (!result.matchedCount) {
            return null;
        }
        else {
            const getCourse = yield db_1.courses.findOne({ id });
            if (!getCourse) {
                return null;
            }
            return (0, getViewModel_1.getViewModel)(getCourse);
        }
    })
};
//# sourceMappingURL=coursesFromDBCommand.js.map