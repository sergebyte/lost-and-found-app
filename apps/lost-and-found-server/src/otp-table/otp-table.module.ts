import { Module } from '@nestjs/common';
import { OtpTableService } from './otp-table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpTableSchema } from './otp-table.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OtpTable', schema: OtpTableSchema }]),
  ],
  providers: [OtpTableService],
  exports: [OtpTableService],
})
export class OtpTableModule {}
