import { Controller, Get, Post, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  findAll(
    @Query('count') count: number, 
    @Query('offset') offset: number
  ) {
    return this.tasksService.findAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.tasksService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.tasksService.remove(id);
  }
}