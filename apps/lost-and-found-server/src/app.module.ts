import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Cristi:R3xjHrmrzNZZQcfs@cluster0.aljg0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    LocationsModule,
  ],
})
export class AppModule {}
