import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll(
    @Query('count') count: number, 
    @Query('offset') offset: number
  ) {
    return this.usersService.findAll(count, offset);
  }
}