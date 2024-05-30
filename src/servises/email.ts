import type { User } from "../types";
import { emailAdapter } from "../adapter/email";
import { usersServises } from "./users";
import { setting } from "../setting";

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
        console.log("Request in emailRouter: ", code, id);
        const user = await usersServises.getUserById(id);
        console.log("User in emailRouter: ", user);
        if(!user) return false;
        console.log("User in emailRouter dates: ", user.emailConfirmation.expires_at, new Date().toISOString());
        if(user.emailConfirmation.expires_at >= new Date().toISOString()) return false;
        if(user.emailConfirmation.code !== code) return false;
        const updatedUser = await usersServises.updateUser({...user, emailConfirmation: {...user.emailConfirmation, isConfirmed: true}});
        console.log("Updated user in emailRouter: ", updatedUser);
        if(!updatedUser) return false;
        return true;
    }
};