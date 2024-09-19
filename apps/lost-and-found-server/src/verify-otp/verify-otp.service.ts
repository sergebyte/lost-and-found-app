import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // Import bcrypt for comparing the OTPs
import { OtpTableService } from 'src/otp-table/otp-table.service';

@Injectable()
export class VerifyOtpService {
  constructor(private otpTableService: OtpTableService) {}

  async verifyOtp(email: string, otpCode: string): Promise<boolean> {
    // Step 1: Retrieve the hashed OTP from the database by email
    const storedHashedOtp = await this.otpTableService.findOtpByEmail(email);

    // Step 2: Check if there is an OTP stored and compare it with the provided OTP
    if (storedHashedOtp && otpCode) {
      const isMatch = await bcrypt.compare(otpCode, storedHashedOtp);

      if (isMatch) {
        // Step 3: If OTP matches, delete it from the database (one-time use)
        await this.otpTableService.deleteOtpByEmail(email);
        return true; // OTP is valid
      }
    }

    // Step 4: If OTP does not match or does not exist, return false
    return false; // OTP is invalid
  }
}
