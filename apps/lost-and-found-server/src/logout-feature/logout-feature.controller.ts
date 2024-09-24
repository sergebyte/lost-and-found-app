import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { LogoutFeatureService } from './logout-feature.service';
import * as argon2 from 'argon2';

@Controller('auth')
export class LogoutFeatureController {
  constructor(private readonly logoutService: LogoutFeatureService) {}

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    const result = await this.logoutService.revokeRefreshToken(refreshToken);
    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return { message: 'Logout successful' };
  }
}
