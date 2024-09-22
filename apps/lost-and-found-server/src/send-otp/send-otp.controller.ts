import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { TooManyRequestsException } from 'src/eceptions/toomanyrequests.exception';
import { SendOtpService } from './send-otp.service';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

const mailRateLimiter = new RateLimiterMemory({
  points: 3, // Maximum 3 requests
  duration: 3600, // Per hour
});

const lastRequestTime: { [key: string]: number } = {};

@Controller('auth')
export class SendOtpController {
  constructor(private sendOtpService: SendOtpService) {}

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    try {
      // Consume 1 point
      await mailRateLimiter.consume(email); // Using email as the unique key

      // Send the OTP
      await this.sendOtpService.sendOtp(email);
      return { message: 'OTP sent successfully' };
    } catch (rejRes) {
      // Handle rate limit exceeded
      if (rejRes instanceof Error) {
        throw new InternalServerErrorException(
          'Failed to send OTP, please try again.',
        );
      }
      throw new TooManyRequestsException(
        'Too many requests, please try again later.',
      );
    }
  }
}
