import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SuccessHandlerService } from '../common/response-handlers/success-handler.service';
import { ErrorHandlerService } from '../common/response-handlers/error-handler.service';
import { Throttle } from '@nestjs/throttler';
import { LoginService } from 'src/auth-jwt/auth-jwt/login.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly successHandlerService: SuccessHandlerService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly loginService: LoginService,
  ) {}

  @Throttle({ default: { limit: 6, ttl: 1800000 } })
  @Post('request-otp')
  @UsePipes(new ValidationPipe())
  async requestOtp(@Body() loginDto: LoginDto) {
    const { email } = loginDto;

    try {
      await this.authService.requestOtp(email);
      return this.successHandlerService.handleSuccess('OTP_SENT');
    } catch (error) {
      this.errorHandlerService.handleError('INTERNAL_SERVER_ERROR');
    }
  }

  @Post('verify-otp')
  @UsePipes(new ValidationPipe())
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;

    const user = await this.authService.verifyOtp(email, otp);
    console.log(user.toString());
    const tokens = await this.loginService.login(user.toString());
    return this.successHandlerService.handleSuccess('USER_AUTHENTICATED', {
      tokens,
    });
  }
}
