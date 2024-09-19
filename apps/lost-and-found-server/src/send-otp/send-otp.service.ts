import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // Import bcrypt
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

      // Step 2: Hash the OTP before storing
      const saltRounds = 10;
      const hashedOtp = await bcrypt.hash(otp, saltRounds);

      // Step 3: Store the hashed OTP in the database
      await this.otpTableService.replaceOrCreateOtp(email, hashedOtp);

      // Step 4: Send the plain OTP via email (do not send the hashed one)
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
