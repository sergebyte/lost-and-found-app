import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshTokenDocument } from './refresh-token.schema';

import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel('RefreshToken')
    private refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<RefreshTokenDocument> {
    const hashedToken = await argon2.hash(refreshToken);

    const createdRefreshToken = new this.refreshTokenModel({
      userId,
      refreshToken: hashedToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    });

    return createdRefreshToken.save();
  }

  async verifyRefreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenDocument | null> {
    let decodedToken;
    try {
      // Decode the refresh token to extract userId
      decodedToken = this.jwtService.decode(refreshToken);
    } catch (error) {
      return null; // Token might be invalid or corrupt
    }

    // Ensure the decoded token contains the userId
    if (!decodedToken || !decodedToken.userId) {
      return null;
    }

    // Search for all refresh tokens in the database for the user
    const storedTokens = await this.refreshTokenModel.find({
      userId: decodedToken.userId,
      revoked: false,
    });

    // Iterate over all stored tokens and compare with the provided one
    for (const storedToken of storedTokens) {
      const isMatch = await argon2.verify(
        storedToken.refreshToken,
        refreshToken,
      );
      if (
        isMatch &&
        storedToken.expiresAt > new Date() &&
        decodedToken.type === 'refresh'
      ) {
        return storedToken; // Return the valid and non-expired token
      }
    }

    // No valid token found
    return null;
  }
}
