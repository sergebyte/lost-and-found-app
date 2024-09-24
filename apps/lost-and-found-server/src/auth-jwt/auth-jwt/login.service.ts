import { Injectable } from '@nestjs/common';
import { AuthJwtService } from './auth-jwt.service'; // Service where you generate JWT
import { RefreshTokenService } from './refresh-token.service'; // The service created above

@Injectable()
export class LoginService {
  constructor(
    private readonly authJwtService: AuthJwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async login(userId: string) {
    // Generate Access and Refresh Tokens
    const accessToken = this.authJwtService.generateAccessToken({
      userId,
      type: 'access',
    });
    const refreshToken = this.authJwtService.generateRefreshToken({
      userId,
      type: 'refresh',
    });

    // Store the hashed refresh token in the database
    await this.refreshTokenService.createRefreshToken(userId, refreshToken);

    // Return the tokens to the client (send the plain refresh token back)
    return { accessToken, refreshToken };
  }
}
