import { IsString, Matches, IsOptional } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  type: string;

  @IsString()
  description: string;

  @Matches(/^\d{9}$/, { message: 'Phone number must be 9 digits' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  image?: string;
}
