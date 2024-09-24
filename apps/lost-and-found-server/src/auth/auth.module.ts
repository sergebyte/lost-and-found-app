import { AuthJwtStrategy } from './../auth-jwt/auth-jwt/auth-jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from '../common/email/email.service';
import { UserService } from '../user/user.service';
import { ErrorHandlerService } from '../common/response-handlers/error-handler.service';
import { OtpService } from './otp.service';
import { UserModule } from '../user/user.module';
import { SuccessHandlerService } from '../common/response-handlers/success-handler.service';
import { LoginService } from 'src/auth-jwt/auth-jwt/login.service';
import { AuthJwtController } from 'src/auth-jwt/auth-jwt/auth-jwt.controller';
import { AuthJwtService } from 'src/auth-jwt/auth-jwt/auth-jwt.service';
import { RefreshTokenService } from 'src/auth-jwt/auth-jwt/refresh-token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthJwtModule } from 'src/auth-jwt/auth-jwt/auth-jwt.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthJwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    UserService,
    OtpService,
    ErrorHandlerService,
    SuccessHandlerService,
    LoginService,
    AuthJwtService,
    RefreshTokenService,
    JwtService,
    AuthJwtStrategy,
  ],
})
export class AuthModule {}
