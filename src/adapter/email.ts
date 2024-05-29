import { Resend } from "resend";
import { setting } from "../setting";

const resend = new Resend(setting.RESEND_API_KEY);

export const emailAdapter = {
  async sendEmail(email: string, subject: string, message: string) {
    return resend.emails.send({
      from: "onboarding@resend.dev",
      to: "basanatoliiee@gmail.com",
      subject: subject,
      html: `<p>${message}</p>`,
    });
  },
};
