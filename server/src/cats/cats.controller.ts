import { Controller, Get, Req, Param, Post, HttpCode, Header, Redirect } from '@nestjs/common';
import { Request } from 'express';

@Controller('/cats')
export class CatsController {
  create() {

  }

  @Get()
  getAll(): string {
    return "All Cats";
  }

  getOne() {

  }

  delete() {

  }
  
}