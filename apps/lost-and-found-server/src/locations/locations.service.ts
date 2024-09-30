import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from './dto/create-announcements.dto';
import { UpdateLocationDto } from './dto/location.dto';
import { Announcement } from './schemas/announcement.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<Announcement>,
  ) {}

  async createAnnouncement(
    createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<Announcement> {
    const createdAnnouncement = new this.announcementModel(
      createAnnouncementDto,
    );
    return createdAnnouncement.save();
  }

  async updateFirstUnlocatedAnnouncement(
    updateLocationDto: UpdateLocationDto,
  ): Promise<Announcement | null> {
    console.log('Updating with coordinates:', updateLocationDto);
    try {
      const updatedAnnouncement = await this.announcementModel.findOneAndUpdate(
        { location: { $exists: false } },
        {
          $set: {
            locationType: 'Point',
            location: [updateLocationDto.longitude, updateLocationDto.latitude],
          },
        },
        { new: true, sort: { createdAt: 1 } },
      );

      if (!updatedAnnouncement) {
        throw new NotFoundException('No announcements without location found');
      }

      return updatedAnnouncement;
    } catch (error) {
      console.error('Error updating announcement:', error);
      throw error;
    }
  }

  async findAll() {
    return this.announcementModel.find({}, 'location title description').exec();
  }
}
