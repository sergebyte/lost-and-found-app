import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailServiceService } from 'src/mail-service/mail-service.service';
import { OtpTableService } from 'src/otp-table/otp-table.service';
import { PassGeneratorService } from 'src/pass-generator/pass-generator.service';

@Injectable()
export class SendOtpService {
  constructor(
    private otpTableService: OtpTableService,
    private passGeneratorService: PassGeneratorService,
    private mailServiceService: MailServiceService,
  ) {}

  async sendOtp(email: string): Promise<void> {
    try {
      // Step 1: Generate OTP
      const otp = this.passGeneratorService.generateOtp();

      // Step 2: Store the OTP in the database
      await this.otpTableService.replaceOrCreateOtp(email, otp);

      // Step 3: Send the OTP via email
      await this.mailServiceService.sendMail(
        email,
        'Your OTP Code',
        `Your OTP code is ${otp}. It will expire in 15 minutes.`,
      );
    } catch (error) {
      console.error('Error occurred while sending OTP:', error);
      throw new InternalServerErrorException(
        'Failed to send OTP, please try again later.',
      );
    }
  }
}
