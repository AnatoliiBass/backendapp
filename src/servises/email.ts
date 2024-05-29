import { emailAdapter } from "../adapter/email";

export const emailServices = {
    async sendEmail(email: string, subject: string, message: string) {
        return await emailAdapter.sendEmail(email, subject, message);
    },
};