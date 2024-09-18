import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassGeneratorModule } from './pass-generator/pass-generator.module';
import { MailServiceModule } from './mail-service/mail-service.module';
import { ConfigModule } from '@nestjs/config';
import { OtpTableModule } from './otp-table/otp-table.module';
import { SendOtpModule } from './send-otp/send-otp.module';

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
  ],
})
export class AppModule {}
