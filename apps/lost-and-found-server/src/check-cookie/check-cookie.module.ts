import { Module } from '@nestjs/common';
import { CheckCookieService } from './check-cookie.service';
import { CheckCookieController } from './check-cookie.controller';
import { CookieValidationService } from 'src/cookie-validation/cookie-validation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session } from 'inspector/promises';
import { SessionSchema } from 'src/session-management/session-management.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [CheckCookieService, CookieValidationService],
  controllers: [CheckCookieController],
})
export class CheckCookieModule {}
