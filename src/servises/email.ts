import type { User } from "../types";
import { emailAdapter } from "../adapter/email";
import { setting } from "../setting";
import { usersRepositoryCommand } from "../repositories/usersFromDBCommand";

export const emailServices = {
    async sendEmail(email: string, subject: string, message: string) {
        return await emailAdapter.sendEmail(email, subject, `<p>${message}</p>`);
    },
    async sendConfirmEmail(user: User) {
        if (user.emailConfirmation.isConfirmed) return false;
        const result = await emailAdapter.sendEmail(user.email, "Confirm email", 
        `<a href="${setting.PROJECT_URL}/email/confirm?code=${user.emailConfirmation.code}">
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
    }
};