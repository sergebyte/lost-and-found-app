import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { ErrorHandlerService } from './common/response-handlers/error-handler.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthJwtModule } from './auth-jwt/auth-jwt/auth-jwt.module';
@Module({
  imports: [
    ItemsModule,
    /* ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_ADDRESS')}:${configService.get('DB_PORT')}`,
        user: configService.get('DB_USER'),
        pass: configService.get('DB_PASSWORD'),
      }),
    }), */
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UserModule,
    AuthModule,
    AuthJwtModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available in your app
      envFilePath: '.env', // Specifies the path to your .env file
    }),
  ],
  providers: [
    ErrorHandlerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
