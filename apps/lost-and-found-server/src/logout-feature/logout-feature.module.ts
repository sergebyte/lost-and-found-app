import { Module } from '@nestjs/common';
import { LogoutFeatureController } from './logout-feature.controller';
import { LogoutFeatureService } from './logout-feature.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema } from 'src/auth-jwt/refresh-token.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [LogoutFeatureController],
  providers: [LogoutFeatureService, JwtService],
})
export class LogoutFeatureModule {}
