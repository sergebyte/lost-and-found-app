import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassGeneratorModule } from './pass-generator/pass-generator.module';
import { MailServiceModule } from './mail-service/mail-service.module';
import { ConfigModule } from '@nestjs/config';
import { OtpTableModule } from './otp-table/otp-table.module';
import { SendOtpModule } from './send-otp/send-otp.module';
import { VerifyOtpModule } from './verify-otp/verify-otp.module';
import { SessionManagementModule } from './session-management/session-management.module';
import { CookieValidationModule } from './cookie-validation/cookie-validation.module';
import { CheckCookieModule } from './check-cookie/check-cookie.module';
import { SendCookieModule } from './send-cookie/send-cookie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available in your app
      envFilePath: '.env', // Specifies the path to your .env file
    }),
    MongooseModule.forRoot('mongodb://mongo:27017/nest'),
    PassGeneratorModule,
    MailServiceModule,
    OtpTableModule,
    SendOtpModule,
    VerifyOtpModule,
    SessionManagementModule,
    CookieValidationModule,
    CheckCookieModule,
    SendCookieModule,
  ],
})
export class AppModule {}
