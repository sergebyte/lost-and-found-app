import { Module } from '@nestjs/common';
import { VerifyOtpService } from './verify-otp.service';
import { VerifyOtpController } from './verify-otp.controller';
import { OtpTableService } from 'src/otp-table/otp-table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpTableSchema } from 'src/otp-table/otp-table.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OtpTable', schema: OtpTableSchema }]),
  ],
  providers: [VerifyOtpService, OtpTableService],
  controllers: [VerifyOtpController],
})
export class VerifyOtpModule {}
