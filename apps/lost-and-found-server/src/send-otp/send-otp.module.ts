import { Module } from '@nestjs/common';
import { SendOtpService } from './send-otp.service';
import { SendOtpController } from './send-otp.controller';
import { MailServiceService } from 'src/mail-service/mail-service.service';
import { OtpTableService } from 'src/otp-table/otp-table.service';
import { PassGeneratorService } from 'src/pass-generator/pass-generator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpTableSchema } from 'src/otp-table/otp-table.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OtpTable', schema: OtpTableSchema }]),
  ],
  providers: [
    SendOtpService,
    MailServiceService,
    OtpTableService,
    PassGeneratorService,
  ],
  controllers: [SendOtpController],
})
export class SendOtpModule {}
