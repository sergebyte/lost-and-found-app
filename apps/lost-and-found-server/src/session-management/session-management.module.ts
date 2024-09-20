import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './session-management.schema';
import { SessionManagementService } from './session-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [SessionManagementService],
  exports: [SessionManagementService],
})
export class SessionManagementModule {}
