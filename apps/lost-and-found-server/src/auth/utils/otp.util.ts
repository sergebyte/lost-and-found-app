import * as bcrypt from 'bcrypt';

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function hashOtp(otp: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(otp, salt);
}

export function isOtpExpired(otpGeneratedAt: Date): boolean {
  const otpExpiryDate = new Date(otpGeneratedAt.getTime() + 900000);
  return otpExpiryDate < new Date();
}

export async function isOtpValid(
  otp: string,
  hashedOtp: string,
): Promise<boolean> {
  return await bcrypt.compare(otp, hashedOtp);
}
