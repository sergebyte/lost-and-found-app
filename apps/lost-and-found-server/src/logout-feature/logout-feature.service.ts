import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokenDocument } from 'src/auth-jwt/refresh-token.schema';
import { JwtService } from '@nestjs/jwt'; // Import JwtService for decoding the token
import * as argon2 from 'argon2'; // Ensure you have the correct Argon2 import

@Injectable()
export class LogoutFeatureService {
  constructor(
    @InjectModel('RefreshToken')
    private refreshTokenModel: Model<RefreshTokenDocument>,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  async revokeRefreshToken(refreshToken: string): Promise<boolean> {
    let decodedToken;

    try {
      // Decode the refresh token to get the userId
      decodedToken = this.jwtService.decode(refreshToken) as { userId: string };
    } catch (error) {
      return false; // Handle decoding error
    }

    // Ensure the decoded token contains the userId
    if (!decodedToken || !decodedToken.userId) {
      return false; // Invalid token, can't find userId
    }

    // Find all valid refresh tokens for the user
    const storedTokens = await this.refreshTokenModel.find({
      userId: decodedToken.userId,
      revoked: false,
    });

    for (const storedToken of storedTokens) {
      // Verify the refresh token against the stored hashed token
      const isMatch = await argon2.verify(
        storedToken.refreshToken,
        refreshToken,
      );
      if (isMatch) {
        // Mark the token as revoked
        storedToken.revoked = true; // Assuming you have a 'revoked' field in your schema
        await storedToken.save();
        return true; // Logout successful
      }
    }

    return false; // No valid token found
  }
}
