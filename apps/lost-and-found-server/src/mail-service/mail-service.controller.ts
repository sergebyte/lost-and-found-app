import { Controller, Post, Body } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';
import { PassGeneratorService } from 'src/pass-generator/pass-generator.service';

@Controller('mail-service')
export class MailServiceController {
  constructor(
    private readonly mailService: MailServiceService,
    private readonly passGeneratorService: PassGeneratorService, // Inject PassGeneratorService to generate OTP
  ) {}

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    await this.mailService.sendMail(
      email,
      'Your OTP Code',
      `Your OTP code is ${this.passGeneratorService.generateOtp()}`,
    );
    return { message: 'OTP sent successfully' };
  }
}
