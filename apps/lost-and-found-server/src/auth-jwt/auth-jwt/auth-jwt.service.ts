import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  // Generate Access Token - Ensure payload is an object
  async generateAccessToken(payload: { userId: string; type: 'access' }) {
    // Payload must be an object
    return this.jwtService.sign(payload); // Signs with 15m expiration (set in module)
  }

  // Generate Refresh Token - Ensure payload is an object
  generateRefreshToken(payload: { userId: string; type: 'refresh' }) {
    // Payload must be an object
    return this.jwtService.sign(payload, { expiresIn: '30d' }); // Signs with 30d expiration
  }
}
