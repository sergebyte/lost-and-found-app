import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ItemsService],
  exports: [],
})
export class ItemsModule {}
