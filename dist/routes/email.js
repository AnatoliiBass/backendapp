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
exports.emailRouter = void 0;
const express_1 = require("express");
const helpersValidator_1 = require("../utils/helpersValidator");
const httpstatuses_1 = require("../utils/httpstatuses");
const email_1 = require("../servises/email");
exports.emailRouter = (0, express_1.Router)();
exports.emailRouter.post("/send", helpersValidator_1.userEmailValidator, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield email_1.emailServices.sendEmail(_req.body.email, _req.body.subject, _req.body.message);
    console.log("Result", result);
    if (result.data === null && result.error !== null) {
        res.statusCode = httpstatuses_1.HTTP_STATUSES.BAD_REQUEST;
        res.statusMessage = "Email not sent";
        return res.json(null);
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.OK).json(result);
}));
//# sourceMappingURL=email.js.map