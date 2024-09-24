import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(6, 6)
  @Matches(/^\d{6}$/, { message: 'otp must be a 6 digits code' })
  otp: string;
}
