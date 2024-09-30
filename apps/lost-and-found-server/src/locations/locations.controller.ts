import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateAnnouncementDto } from './dto/create-announcements.dto';
import { UpdateLocationDto } from './dto/location.dto';
import { Types } from 'mongoose';

@Controller('announcements')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async createAnnouncement(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ) {
    return this.locationsService.createAnnouncement(createAnnouncementDto);
  }

  @Put('update-location')
  async updateLocation(@Body() updateLocationDto: UpdateLocationDto) {
    try {
      const updatedAnnouncement =
        await this.locationsService.updateFirstUnlocatedAnnouncement(
          updateLocationDto,
        );
      return updatedAnnouncement;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error updating location:', error);
    }
  }

  @Get()
  async getAnnouncements() {
    return this.locationsService.findAll(); // Ensure this method fetches the relevant data
  }
}
