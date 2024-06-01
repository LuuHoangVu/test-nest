import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async getItem(id: any): Promise<Item> {
    return this.itemRepository.findOne(id);
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(newItem);
  }

  async updateItem(id: any, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, updateItemDto);
    return this.itemRepository.findOne(id);
  }

  async deleteItem(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
