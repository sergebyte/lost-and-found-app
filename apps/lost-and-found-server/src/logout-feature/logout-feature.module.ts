import { Module } from '@nestjs/common';
import { LogoutFeatureService } from './logout-feature.service';
import { LogoutFeatureController } from './logout-feature.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Session } from 'inspector/promises';
import { SessionSchema } from 'src/session-management/session-management.schema';
import { SessionManagementModule } from 'src/session-management/session-management.module';
import { SessionManagementService } from 'src/session-management/session-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [LogoutFeatureService, SessionManagementService],
  controllers: [LogoutFeatureController],
})
export class LogoutFeatureModule {}
