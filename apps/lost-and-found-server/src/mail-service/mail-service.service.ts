import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailServiceService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Specify Gmail's SMTP server
        port: 587, // TLS port
        secure: false, // Use TLS, not SSL (SSL is secure: true with port 465)  
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your generated app password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
