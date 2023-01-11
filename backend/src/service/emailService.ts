import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';
import path from 'path';
import { EmailActionEnum, emailInformation } from '../emailInformation';
import { config } from '../config';

class EmailService {
    private _templateRender = new EmailTemplates({
        views: {
            root: path.join(__dirname, '../', 'emailTemplates'),
            options: {
                extension: 'hbs',
            },
        },
    });

    public async sendMail(userEmail: string, action: Partial<EmailActionEnum>, context: object): Promise<void> {
        const { subject, templateName } = emailInformation[action];

        const html = await this._templateRender.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            service: 'gmail',
            from: 'Admin',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_PASSWORD,
            },
        });

        await emailTransporter.sendMail({
            to: userEmail,
            html,
            subject,
        });
    }
}

export const emailService = new EmailService();
