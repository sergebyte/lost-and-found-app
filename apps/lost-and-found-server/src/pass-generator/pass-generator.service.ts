import { Injectable } from '@nestjs/common';

@Injectable()
export class PassGeneratorService {
  // Method to generate a 6-digit OTP that can include leading zeros
  generateOtp(): string {
    const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return otp;
  }
}
