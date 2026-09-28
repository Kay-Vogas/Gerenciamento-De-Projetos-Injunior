import nodemailer from "nodemailer";
import type { SendEmail, SendEmailInput } from "./Email.interface.js";

export class NodeMailer implements SendEmail {
  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async send({ to, subject, html }: SendEmailInput): Promise<void> {
    await this.transporter.sendMail({
      from: `"Gerenciador de Atividades" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
}