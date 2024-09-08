import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from 'mongoose';

import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private tasksModel: Model<TaskDocument>) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    try {
      const task = await this.tasksModel.create(dto);
      return task;
    } catch (error) {
      throw new BadRequestException(`Failed to create the task, ${error.message}`);
    }
  }

  async findAll(count = 10, offset = 0): Promise<Task[]> {
    try {
      const tasks = await this.tasksModel
        .find()
        .skip(Number(offset))
        .limit(Number(count));

      return tasks;
    } catch (error) {
      throw new BadRequestException(`Failed to find tasks, ${error.message}`);
    }
  }

  async search(query: string): Promise<Task[]> {
    try {
      const tasks = await this.tasksModel.find({
        name: { $regex: new RegExp(query, 'i') }
      });
      return tasks;      
    } catch (error) {
      throw new BadRequestException(`Failed to search tasks, ${error.message}`);
    }
  }

  async findOne(id: ObjectId): Promise<Task> {
    try {
      const task = await this.tasksModel.findById(id);
      return task;
    } catch (error) {
      throw new BadRequestException(`Failed to find the tasks, ${error.message}`);
    }
  }

  async update(id: ObjectId, dto: UpdateTaskDto): Promise<ObjectId> {
    try {
      const task = await this.tasksModel.findByIdAndUpdate(id, dto);
      return task.id;
    } catch (error) {
      throw new BadRequestException(`Failed to update the task, ${error.message}`);
    }
  }

  async remove(id: ObjectId): Promise<ObjectId> {
    try {
      const removedTask = await this.tasksModel.findByIdAndDelete(id);
      return removedTask.id;
    } catch (error) {
      throw new BadRequestException(`Failed to delete the task, ${error.message}`);
    }
  }
}
