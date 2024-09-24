import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aliens.team.noreply@gmail.com',
        pass: 'yyroqudgkksbstmr',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: 'aliens.team.noreply@gmail.com',
      to,
      subject,
      text,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendOtpEmail(email: string, otp: string) {
    const subject = '[Findr] Your One Time Password';
    const text = `Your one time password is ${otp}. It will expire in 15 minutes. Please do not share this with anyone.`;

    await this.sendEmail(email, subject, text);
  }
}
