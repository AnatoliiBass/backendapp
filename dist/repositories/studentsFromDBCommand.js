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
exports.studentsRepositoryCommand = void 0;
const db_1 = require("../db/db");
exports.studentsRepositoryCommand = {
    deleteStudent: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.students.deleteOne({ id });
        return result.deletedCount === 1;
    }),
    createStudent: (student) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.students.insertOne(student);
        const studentSaved = yield db_1.students.findOne({ id: student.id });
        return {
            id: studentSaved.id,
            first_name: studentSaved.first_name,
            last_name: studentSaved.last_name,
            email: studentSaved.email,
            phone: studentSaved.phone,
            birthdate: studentSaved.birthdate,
            password: studentSaved.password,
            created_at: studentSaved.created_at
        };
    }),
    getStudentByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield db_1.students.findOne({ email });
        if (!student) {
            return null;
        }
        return {
            id: student.id,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            phone: student.phone,
            birthdate: student.birthdate,
            password: student.password,
            created_at: student.created_at
        };
    }),
    getStudentById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield db_1.students.findOne({ id });
        if (!student) {
            return null;
        }
        return {
            id: student.id,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            phone: student.phone,
            birthdate: student.birthdate,
            password: student.password,
            created_at: student.created_at
        };
    }),
};
//# sourceMappingURL=studentsFromDBCommand.js.map