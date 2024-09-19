import { Injectable } from '@nestjs/common';
import { OtpTableService } from 'src/otp-table/otp-table.service';

@Injectable()
export class VerifyOtpService {
  constructor(private otpTableService: OtpTableService) {}

  async verifyOtp(email: string, otpCode: string): Promise<boolean> {
    const storedOtpCode = await this.otpTableService.findOtpByEmail(email);

    if (storedOtpCode && otpCode && storedOtpCode === otpCode) {
      // Delete the OTP after successful verification
      await this.otpTableService.deleteOtpByEmail(email);

      return true; // OTP is valid
    } else {
      return false; // OTP is invalid
    }
  }
}
