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
exports.studentsRouter = void 0;
const express_1 = require("express");
const httpstatuses_1 = require("../utils/httpstatuses");
const helpersValidator_1 = require("../utils/helpersValidator");
const validation_1 = require("../middelwares/validation");
const students_1 = require("../servises/students");
exports.studentsRouter = (0, express_1.Router)();
exports.studentsRouter.post("/", ...helpersValidator_1.studentValidation, validation_1.standartValidation, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = yield students_1.studentsServises.createStudent(_req.body.first_name, _req.body.last_name, _req.body.email, _req.body.phone, _req.body.birthdate, _req.body.password);
    if (!newStudent) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.DATA_EXISTS;
        res.statusMessage = "Student already exists";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(newStudent);
}));
//# sourceMappingURL=students.js.map