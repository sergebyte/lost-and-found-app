import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { RefreshTokenService } from './refresh-token.service';
import { AuthJwtService } from './auth-jwt.service';

@Controller('auth')
export class AuthJwtController {
  constructor(
    private readonly loginService: LoginService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  @Post('login')
  async login(@Body('userId') userId: string) {
    // Call login function to get tokens
    const tokens = await this.loginService.login(userId);
    return tokens; // Send access and refresh tokens to client
  }
  @Post('refresh')
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    try {
      // Verify refresh token and issue a new access token
      const validRefreshToken =
        await this.refreshTokenService.verifyRefreshToken(refreshToken);
      if (!validRefreshToken) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      // Generate new access token
      const newAccessToken = this.authJwtService.generateAccessToken({
        userId: validRefreshToken.userId,
        type: 'access',
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      // If the error is not an instance of HttpException, you can handle it gracefully
      if (error instanceof BadRequestException) {
        throw error; // Pass along the bad request exception with its message
      } else {
        throw new UnauthorizedException(
          'An error occurred while processing your request',
        );
      }
    }
  }
}
