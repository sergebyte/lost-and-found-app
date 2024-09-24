import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtService } from './auth-jwt.service';
import { AuthJwtStrategy } from './auth-jwt.strategy';
import { AuthJwtController } from './auth-jwt.controller';
import { LoginService } from './login.service';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from './refresh-token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema } from './refresh-token.schema';
import { TestContext } from 'node:test';
import { TestController } from './test.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
  ],
  providers: [
    AuthJwtService,
    AuthJwtStrategy,
    LoginService,
    RefreshTokenService,
  ],
  exports: [AuthJwtService],
  controllers: [AuthJwtController, TestController], // Export the service to use in other modules
})
export class AuthJwtModule {}
