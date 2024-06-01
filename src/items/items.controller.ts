import {Controller, Get, Post, Put, Delete, Body, Param, UseGuards} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from '../items/dto/create-item.dto';
import { UpdateItemDto } from '../items/dto/update-item.dto';
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles.decorator";

@Controller('items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return 'This route can only be accessed by admin';
  }

  @Get()
  getAllItems() {
    return this.itemsService.getAllItems();
  }

  @Get(':id')
  getItem(@Param('id') id: string) {
    return this.itemsService.getItem(id);
  }

  @Post()
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.createItem(createItemDto);
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.itemsService.deleteItem(id);
  }
}
