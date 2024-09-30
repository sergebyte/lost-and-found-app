import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import {
  AnnouncementSchema,
  Announcement,
} from './schemas/announcement.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Cristi:R3xjHrmrzNZZQcfs@cluster0.aljg0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
    ]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
