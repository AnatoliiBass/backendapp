import type { User } from "../types";
import { emailAdapter } from "../adapter/email";
import { setting } from "../setting";
import { usersRepositoryCommand } from "../repositories/usersFromDBCommand";
import {add} from "date-fns/add";
import { uuid } from 'uuidv4';

export const emailServices = {
    async sendEmail(email: string, subject: string, message: string) {
        return await emailAdapter.sendEmail(email, subject, `<p>${message}</p>`);
    },
    async sendConfirmEmail(user: User) {
        if (user.emailConfirmation.isConfirmed) return false;
        const result = await emailAdapter.sendEmail(user.email, "Confirm email", 
        `<a href="${setting.PROJECT_URL}/email/confirmEmail?code=${user.emailConfirmation.code}">
        Confirm email</a>`);
        if (result.data === null && result.error !== null) {
            return false;
        }
        return true;
    },
    async confirmEmail(code: string) {
        const user = await usersRepositoryCommand.getUserByConfirmCode(code);
        if(!user) return false;
        if (user.emailConfirmation.isConfirmed) return false;
        if(user.emailConfirmation.expires_at <= new Date().toISOString()) return false;
        if(user.emailConfirmation.code !== code) return false;
        const updatedUser = await usersRepositoryCommand.updateUserConfirm(user.id);
        if(!updatedUser) return false;
        return true;
    },
    async sendResetPassword(email: string) {
        console.log(email);
        const user = await usersRepositoryCommand.getUserByEmail(email);
        if(!user) return false;
        if ((user.resetPassword && user.resetPassword.isBlocked) || (user.resetPassword && user.resetPassword.isConfirmed) ||
        (user.resetPassword && user.resetPassword.count > 5) || 
        (user.resetPassword && user.resetPassword.expires_at && user.resetPassword.expires_at <= new Date().toISOString())) return false;
        const updatedUser = await usersRepositoryCommand.updateUserResetPassword(user.id,{
            code: uuid(),
            expires_at: add(new Date(), {minutes: 5}).toISOString(),
            isBlocked: user.resetPassword && user.resetPassword.count > 5 ? true : false,
            isConfirmed: false,
            count: user.resetPassword ? user.resetPassword.count + 1 : 0
        });
        if(!updatedUser) return false;
        const result = await emailAdapter.sendEmail(user.email, "Reset password", 
        `<a href="${setting.PROJECT_URL}/email/confirmResetPasswordEmail?code=${updatedUser.resetPassword.code}">
        Reset password</a>`);
        if (result.data === null && result.error !== null) {
            return false;
        }
        return true;
    },
    async confirmResetPassword(code: string) {
        const user = await usersRepositoryCommand.getUserByConfirmResetPasswordCode(code);
        if(!user) return false;
        if ((user.resetPassword && user.resetPassword.isBlocked) || 
        (user.resetPassword && user.resetPassword.isConfirmed) ||
        (user.resetPassword && user.resetPassword.count > 5)) return false;
        if(user.resetPassword && user.resetPassword.expires_at <= new Date().toISOString()) return false;
        if(user.resetPassword && user.resetPassword.code !== code) return false;
        const updatedUser = await usersRepositoryCommand.updateUserResetPassword(user.id, {
            code: user.resetPassword.code,
            expires_at: user.resetPassword.expires_at,
            isBlocked: user.resetPassword && user.resetPassword.count > 5 ? true : false,
            isConfirmed: true,
            count: user.resetPassword ? user.resetPassword.count + 1 : 0
        });
        if(!updatedUser) return false;
        return true;
    }
};