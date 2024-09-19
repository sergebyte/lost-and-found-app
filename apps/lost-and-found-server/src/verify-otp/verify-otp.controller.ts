import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { VerifyOtpService } from './verify-otp.service';

@Controller('auth')
export class VerifyOtpController {
  constructor(private verifyOtpService: VerifyOtpService) {}

  @Post('verify')
  async verifyOtp(
    @Body('email') email: string,
    @Body('otpCode') otpCode: string,
  ) {
    // Verify the OTP code using VerifyOtpService
    const isValid = await this.verifyOtpService.verifyOtp(email, otpCode);

    if (isValid) {
      // OTP is valid
      return { message: 'OTP is valid' };
    } else {
      // OTP is invalid
      throw new UnauthorizedException('Invalid OTP code');
    }
  }
}
