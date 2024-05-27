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
exports.feedbackRouter = void 0;
const express_1 = require("express");
const httpstatuses_1 = require("../utils/httpstatuses");
const helpersValidator_1 = require("../utils/helpersValidator");
const auth_1 = require("../middelwares/auth");
const feedback_1 = require("../servises/feedback");
exports.feedbackRouter = (0, express_1.Router)();
exports.feedbackRouter.post("/", helpersValidator_1.commentValidator, auth_1.authValidation, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_1.feedbackServises.sendFeedback(_req.body.comment, _req.body.user_id, _req.body.course_id);
    console.log("Result from feedback router: ", result);
    return res.status(httpstatuses_1.HTTP_STATUSES.CREATED).json(result);
}));
//# sourceMappingURL=feedback.js.map