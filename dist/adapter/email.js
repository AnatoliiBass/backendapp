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
exports.emailAdapter = void 0;
const resend_1 = require("resend");
const setting_1 = require("../setting");
const resend = new resend_1.Resend(setting_1.setting.RESEND_API_KEY);
exports.emailAdapter = {
    sendEmail(email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return resend.emails.send({
                from: "onboarding@resend.dev",
                to: "basanatolii@gmail.com",
                subject: subject,
                html: message,
            });
        });
    },
};
//# sourceMappingURL=email.js.map