import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpTable, OtpTableDocument } from './otp-table.schema';

@Injectable()
export class OtpTableService {
  constructor(
    @InjectModel(OtpTable.name) private otpTableModel: Model<OtpTableDocument>,
  ) {}
  // Function to replace or add OTP code and update `createdAt`
  async replaceOrCreateOtp(
    email: string,
    newCode: string,
    newCreatedAt?: Date,
  ): Promise<OtpTable> {
    // If `newCreatedAt` is not provided, use the current date and time
    const updatedCreatedAt = newCreatedAt || new Date();

    return this.otpTableModel
      .findOneAndUpdate(
        { email },
        {
          code: newCode,
          createdAt: updatedCreatedAt,
        },
        { new: true, upsert: true }, // Return the updated document and create if not exists
      )
      .exec();
  }
}
