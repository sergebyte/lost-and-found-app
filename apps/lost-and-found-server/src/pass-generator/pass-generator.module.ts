import { Module } from '@nestjs/common';
import { PassGeneratorService } from './pass-generator.service';

@Module({
  providers: [PassGeneratorService],
  exports: [PassGeneratorService],
})
export class PassGeneratorModule {}
