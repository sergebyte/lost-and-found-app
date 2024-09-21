import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { VerifyOtpService } from './verify-otp.service';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

// Set up the rate limiter: 5 tries in 15 minutes
const otpRateLimiter = new RateLimiterMemory({
  points: 5, // Number of attempts
  duration: 15 * 60, // Per 15 minutes
});

@Controller('auth')
export class VerifyOtpController {
  constructor(private verifyOtpService: VerifyOtpService) {}

  @Post('verify')
  async verifyOtp(
    @Body('email') email: string,
    @Body('otpCode') otpCode: string,
  ) {
    try {
      // Consume 1 point for the user email
      await otpRateLimiter.consume(email);

      // Verify the OTP code using VerifyOtpService
      const isValid = await this.verifyOtpService.verifyOtp(email, otpCode);

      if (isValid) {
        // OTP is valid, return success response
        otpRateLimiter.delete(email); // Reset attempts for the email
        return { message: 'OTP is valid' };
      } else {
        // OTP is invalid, throw an exception
        throw new UnauthorizedException('Invalid OTP code');
      }
    } catch (error) {
      // Check if the error is from rate-limiter
      if (error instanceof RateLimiterRes) {
        // If rate limit is exceeded, throw a custom error
        throw new BadRequestException(
          'Too many invalid attempts. Please try again later.',
        );
      }

      // Handle other errors
      if (error instanceof UnauthorizedException) {
        throw error; // Re-throw UnauthorizedException
      }

      // For any other errors, throw an internal server error
      throw new BadRequestException('An unexpected error occurred.');
    }
  }
}
