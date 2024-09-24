import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { EmailService } from '../common/email/email.service';
import {
  generateOtp,
  hashOtp,
  isOtpExpired,
  isOtpValid,
} from './utils/otp.util';
import { ErrorHandlerService } from '../common/response-handlers/error-handler.service';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class OtpService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async requestOtp(email: string): Promise<boolean> {
    const user = await this.userService.findUser(email);

    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);
    const otpGeneratedAt = new Date(Date.now());

    if (user) {
      await this.userService.updateUserOtp(user, hashedOtp, otpGeneratedAt);
    } else {
      await this.userService.createUserAndProfile(email, hashedOtp);
    }

    await this.emailService.sendOtpEmail(email, otp);
    return true;
  }

  async verifyOtp(email: string, otp: string): Promise<Object> {
    const user = await this.userService.findUser(email);

    if (!user) {
      this.errorHandlerService.handleError('USER_EXPIRED');
    }

    if (!user.otp || !user.otpGeneratedAt) {
      this.errorHandlerService.handleError('OTP_EXPIRED');
    }

    if (isOtpExpired(user.otpGeneratedAt)) {
      this.errorHandlerService.handleError('OTP_EXPIRED');
    }

    if (!(await isOtpValid(otp, user.otp))) {
      this.errorHandlerService.handleError('INVALID_OTP');
    }

    await this.userService.registerAndRemoveUserOtp(user);

    return user._id;
  }
}
