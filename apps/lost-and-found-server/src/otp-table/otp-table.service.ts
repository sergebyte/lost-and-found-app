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
  async replaceOrCreateOtp(email: string, newCode: string): Promise<OtpTable> {
    // Calculate the new expiry date, 900 seconds from now
    const newExpiryDate = new Date(Date.now() + 180000); // 900 seconds from now

    return this.otpTableModel
      .findOneAndUpdate(
        { email },
        {
          code: newCode, // Update the OTP code
          expiryDate: newExpiryDate, // Set the new expiry date
        },
        { new: true, upsert: true, fields: { createdAt: 1 } },
      )
      .exec();
  }

  // New function to find the hashed OTP by email
  async findOtpByEmail(email: string): Promise<string | null> {
    const record = await this.otpTableModel.findOne({ email }).exec();

    // Return the hashed OTP code if record exists, otherwise return null
    return record ? record.code : null;
  }
  // Function to delete OTP by email
  async deleteOtpByEmail(email: string): Promise<void> {
    await this.otpTableModel.deleteOne({ email }).exec();
  }
}
