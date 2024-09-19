import { Module } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';
import { PassGeneratorService } from 'src/pass-generator/pass-generator.service';

@Module({
  providers: [MailServiceService, PassGeneratorService],
  exports: [MailServiceService],
})
export class MailServiceModule {}
