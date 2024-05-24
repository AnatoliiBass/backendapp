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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsServises = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const studentsFromDBCommand_1 = require("../repositories/studentsFromDBCommand");
exports.studentsServises = {
    createStudent(first_name, last_name, email, phone, birthdate, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const newStudent = {
                id: new Date().getTime(),
                first_name,
                last_name,
                email,
                phone,
                birthdate,
                password: passwordHash,
                created_at: new Date().toISOString()
            };
            return yield studentsFromDBCommand_1.studentsRepositoryCommand.createStudent(newStudent);
        });
    },
    _generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, salt);
        });
    },
    checkCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentsFromDBCommand_1.studentsRepositoryCommand.getStudentByEmail(email);
            if (!student) {
                return false;
            }
            return yield bcrypt_1.default.compare(password, student.password);
        });
    }
};
//# sourceMappingURL=students.js.map