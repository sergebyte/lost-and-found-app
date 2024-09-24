import { ErrorHandlerService } from '../common/response-handlers/error-handler.service';
import { Injectable } from '@nestjs/common';
import { OtpService } from './otp.service';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly otpService: OtpService,
  ) {}

  async requestOtp(email: string): Promise<boolean> {
    try {
      await this.otpService.requestOtp(email);
      return true;
    } catch (error) {
      this.errorHandlerService.handleError('INTERNAL_SERVER_ERROR');
    }
  }

  async verifyOtp(email: string, otp: string): Promise<Object> {
    return await this.otpService.verifyOtp(email, otp);
  }
}
