import { Module } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';
import { MailServiceController } from './mail-service.controller';
import { PassGeneratorService } from 'src/pass-generator/pass-generator.service';

@Module({
  providers: [MailServiceService, PassGeneratorService],
  controllers: [MailServiceController],
})
export class MailServiceModule {}
