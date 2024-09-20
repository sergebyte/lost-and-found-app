import { Module } from '@nestjs/common';
import { SendCookieService } from './send-cookie.service';
import { SendCookieController } from './send-cookie.controller';
import { SessionManagementService } from 'src/session-management/session-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session } from 'inspector/promises';
import { SessionSchema } from 'src/session-management/session-management.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [SendCookieService, SessionManagementService],
  controllers: [SendCookieController],
})
export class SendCookieModule {}
