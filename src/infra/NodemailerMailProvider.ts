import nodemailer from "nodemailer";
import type { EmailDTO, SendEmail } from "./Email.interface.js";
 
export class NodeMailer implements SendEmail{
    transporter: import("nodemailer").Mail<import("nodemailer").SMTPSentMessageInfo>;
    
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"kay.vogas@gmail.com",
                pass:"fmdq ejyp irrj ihah"
            }     
        })
    }

    async send({ to, subject, html }:EmailDTO): Promise<void> {
        await this.transporter.sendMail({
            from: `"Meu App" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html,
        });
    }
}