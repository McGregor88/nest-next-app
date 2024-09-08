import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { hash } from 'bcryptjs';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    try {
      await new this.usersModel({
        ...dto,
        password: await hash(dto.password, 10),
      }).save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersModel.find({});
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(query: FilterQuery<User>): Promise<User> {
    try {
      const user = (await this.usersModel.findOne(query)).toObject();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(query: FilterQuery<User>, data: UpdateQuery<User>) {
    try {
      return await this.usersModel.findOneAndUpdate(query, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOrCreate(dto: CreateUserDto): Promise<User|void> {
    try {
      const user = await this.usersModel.findOne({ email: dto.email });
      if (user) return user;
      return this.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
