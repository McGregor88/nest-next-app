import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { hash } from 'bcryptjs';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    await new this.usersModel({
      ...dto,
      password: await hash(dto.password, 10),
    }).save();
  }

  async findAll(count = 10, offset = 0): Promise<User[]> {
    const users = await this.usersModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));

    return users;
  }

  async findOne(query: FilterQuery<User>): Promise<User> {
    const user = (await this.usersModel.findOne(query)).toObject();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return await this.usersModel.findOneAndUpdate(query, data);
  }
}
