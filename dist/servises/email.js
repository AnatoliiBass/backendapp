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
const setting_1 = require("../setting");
const usersFromDBCommand_1 = require("../repositories/usersFromDBCommand");
const add_1 = require("date-fns/add");
const uuidv4_1 = require("uuidv4");
exports.emailServices = {
    sendEmail(email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield email_1.emailAdapter.sendEmail(email, subject, `<p>${message}</p>`);
        });
    },
    sendConfirmEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.emailConfirmation.isConfirmed)
                return false;
            const result = yield email_1.emailAdapter.sendEmail(user.email, "Confirm email", `<a href="${setting_1.setting.PROJECT_URL}/email/confirmEmail?code=${user.emailConfirmation.code}">
        Confirm email</a>`);
            if (result.data === null && result.error !== null) {
                return false;
            }
            return true;
        });
    },
    confirmEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersFromDBCommand_1.usersRepositoryCommand.getUserByConfirmCode(code);
            console.log("User", user);
            if (!user)
                return false;
            if (user.emailConfirmation.isConfirmed)
                return false;
            console.log("user.emailConfirmation.expires_at <= new Date().toISOString()", user.emailConfirmation.expires_at <= new Date().toISOString());
            if (user.emailConfirmation.expires_at <= new Date().toISOString())
                return false;
            if (user.emailConfirmation.code !== code)
                return false;
            const updatedUser = yield usersFromDBCommand_1.usersRepositoryCommand.updateUserConfirm(user.id);
            console.log("updatedUser", updatedUser);
            if (!updatedUser)
                return false;
            return true;
        });
    },
    sendResetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email);
            const user = yield usersFromDBCommand_1.usersRepositoryCommand.getUserByEmail(email);
            if (!user)
                return false;
            if ((user.resetPassword && user.resetPassword.isBlocked) || (user.resetPassword && user.resetPassword.isConfirmed) ||
                (user.resetPassword && user.resetPassword.count > 5) ||
                (user.resetPassword && user.resetPassword.expires_at && user.resetPassword.expires_at <= new Date().toISOString()))
                return false;
            const updatedUser = yield usersFromDBCommand_1.usersRepositoryCommand.updateUserResetPassword(user.id, {
                code: (0, uuidv4_1.uuid)(),
                expires_at: (0, add_1.add)(new Date(), { minutes: 5 }).toISOString(),
                isBlocked: user.resetPassword && user.resetPassword.count > 5 ? true : false,
                isConfirmed: false,
                count: user.resetPassword ? user.resetPassword.count + 1 : 0
            });
            if (!updatedUser)
                return false;
            const result = yield email_1.emailAdapter.sendEmail(user.email, "Reset password", `<a href="${setting_1.setting.PROJECT_URL}/email/confirmResetPasswordEmail?code=${updatedUser.resetPassword.code}">
        Reset password</a>`);
            if (result.data === null && result.error !== null) {
                return false;
            }
            return true;
        });
    },
    confirmResetPassword(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersFromDBCommand_1.usersRepositoryCommand.getUserByConfirmResetPasswordCode(code);
            if (!user)
                return false;
            if ((user.resetPassword && user.resetPassword.isBlocked) ||
                (user.resetPassword && user.resetPassword.isConfirmed) ||
                (user.resetPassword && user.resetPassword.count > 5))
                return false;
            if (user.resetPassword && user.resetPassword.expires_at <= new Date().toISOString())
                return false;
            if (user.resetPassword && user.resetPassword.code !== code)
                return false;
            const updatedUser = yield usersFromDBCommand_1.usersRepositoryCommand.updateUserResetPassword(user.id, {
                code: user.resetPassword.code,
                expires_at: user.resetPassword.expires_at,
                isBlocked: user.resetPassword && user.resetPassword.count > 5 ? true : false,
                isConfirmed: true,
                count: user.resetPassword ? user.resetPassword.count + 1 : 0
            });
            if (!updatedUser)
                return false;
            return true;
        });
    }
};
//# sourceMappingURL=email.js.map