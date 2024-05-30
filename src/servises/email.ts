import type { User } from "../types";
import { emailAdapter } from "../adapter/email";
import { usersServises } from "./users";
import { setting } from "../setting";
import { usersRepositoryCommand } from "../repositories/usersFromDBCommand";

export const emailServices = {
    async sendEmail(email: string, subject: string, message: string) {
        return await emailAdapter.sendEmail(email, subject, `<p>${message}</p>`);
    },
    async sendConfirmEmail(user: User) {
        const result = await emailAdapter.sendEmail(user.email, "Confirm email", 
        `<a href="${setting.PROJECT_URL}/email/confirm?code=${user.emailConfirmation.code}&id=${user.id.toString()}">
        Confirm email</a>`);
        if (result.data === null && result.error !== null) {
            return false;
        }
        return true;
    },
    async confirmEmail(code: string, id: number) {
        const user = await usersServises.getUserById(id);
        if(!user) return false;
        if (user.emailConfirmation.isConfirmed) return false;
        if(user.emailConfirmation.expires_at <= new Date().toISOString()) return false;
        if(user.emailConfirmation.code !== code) return false;
        const updatedUser = await usersRepositoryCommand.updateUserConfirm(id);
        if(!updatedUser) return false;
        return true;
    }
};