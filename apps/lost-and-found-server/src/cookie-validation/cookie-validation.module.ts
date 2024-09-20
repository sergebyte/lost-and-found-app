import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CookieValidationService } from './cookie-validation.service';
import {
  Session,
  SessionSchema,
} from '../session-management/session-management.schema'; // Adjust import as needed

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [CookieValidationService],
  exports: [CookieValidationService],
})
export class CookieValidationModule {}
