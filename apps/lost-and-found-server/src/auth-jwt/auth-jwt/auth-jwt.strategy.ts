import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Inject ConfigService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Load secret from ConfigService
    });
  }

  async validate(payload: any) {
    if (payload.type !== 'access') {
      throw new UnauthorizedException(); // You can create a custom exception if needed
    }
    return { userId: payload.userId }; // Attach user ID to the request
  }
}
