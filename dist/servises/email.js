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
exports.emailServices = void 0;
const email_1 = require("../adapter/email");
const users_1 = require("./users");
const setting_1 = require("../setting");
exports.emailServices = {
    sendEmail(email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield email_1.emailAdapter.sendEmail(email, subject, `<p>${message}</p>`);
        });
    },
    sendConfirmEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield email_1.emailAdapter.sendEmail(user.email, "Confirm email", `<a href="${setting_1.setting.PROJECT_URL}/email/confirm?code=${user.emailConfirmation.code}&id=${user.id}">
        Confirm email</a>`);
            if (result.data === null && result.error !== null) {
                return false;
            }
            return true;
        });
    },
    confirmEmail(code, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.usersServises.getUserById(id);
            if (!user)
                return false;
            if (user.emailConfirmation.expires_at >= new Date().toISOString())
                return false;
            if (user.emailConfirmation.code !== code)
                return false;
            const updatedUser = yield users_1.usersServises.updateUser(Object.assign(Object.assign({}, user), { emailConfirmation: Object.assign(Object.assign({}, user.emailConfirmation), { isConfirmed: true }) }));
            if (!updatedUser)
                return false;
            return true;
        });
    }
};
//# sourceMappingURL=email.js.map