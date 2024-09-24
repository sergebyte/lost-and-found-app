import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto.js';
import { UpdateItemDto } from './dto/update-item.dto.js';

@Injectable()
export class ItemsService {
  create(createItemsDto: CreateItemDto) {
    return 'This action adds a new items';
  }

  findAll() {
    return `This action returns all itemss`;
  }

  findOne(id: number) {
    return `This action returns a #id items`;
  }

  update(id: number, updateItemsDto: UpdateItemDto) {
    return `This action updates a #id items`;
  }

  remove(id: number) {
    return `This action removes a #id items`;
  }
}
