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
exports.authRouter = void 0;
const express_1 = require("express");
const httpstatuses_1 = require("../utils/httpstatuses");
const helpersValidator_1 = require("../utils/helpersValidator");
const validation_1 = require("../middelwares/validation");
const users_1 = require("../servises/users");
const jwtService_1 = require("../application/jwtService");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/login", helpersValidator_1.userEmailValidator, helpersValidator_1.userPasswordValidator, validation_1.standartValidation, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.usersServises.checkCredentials(_req.body.email, _req.body.password);
    if (!user) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.UNAUTHORIZED;
        res.statusMessage = "Invalid credentials";
        return res.json(null);
    }
    const token = yield jwtService_1.jwtService.generateToken(user);
    res.cookie("refreshtoken", token.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
    });
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(token.token);
}));
exports.authRouter.post("/register", ...helpersValidator_1.userValidation, validation_1.standartValidation, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users_1.usersServises.createUser(_req.body.first_name, _req.body.last_name, _req.body.role, _req.body.email, _req.body.phone, _req.body.birthdate, _req.body.password);
    if (newUser === null) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.BAD_REQUEST;
        res.statusMessage = "User not created";
        return res.json(null);
    }
    if (newUser === undefined) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.DATA_EXISTS;
        res.statusMessage = "User already exists. Please, try another email, or try to confirm your email, or try again after 5 min.";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(newUser);
}));
exports.authRouter.post("/resetPassword", helpersValidator_1.userEmailValidator, helpersValidator_1.userPasswordValidator, validation_1.standartValidation, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_1.usersServises.resetPassword(_req.body.email, _req.body.password);
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(result);
}));
//# sourceMappingURL=auth.js.map