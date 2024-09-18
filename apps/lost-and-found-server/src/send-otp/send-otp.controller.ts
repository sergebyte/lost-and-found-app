import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { SendOtpService } from './send-otp.service';

@Controller('auth')
export class SendOtpController {
  constructor(private sendOtpService: SendOtpService) {}

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    try {
      await this.sendOtpService.sendOtp(email);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to send OTP, please try again.',
      );
    }
  }
}
