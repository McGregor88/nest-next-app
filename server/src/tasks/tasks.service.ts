import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from 'mongoose';

import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private tasksModel: Model<TaskDocument>) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = await this.tasksModel.create(dto);
    return task;
  }

  async findAll(count = 10, offset = 0): Promise<Task[]> {
    const tasks = await this.tasksModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));

    return tasks;
  }

  async search(query: string): Promise<Task[]> {
    const tasks = await this.tasksModel.find({
      name: { $regex: new RegExp(query, 'i') }
    });
    return tasks;
  }

  async findOne(id: ObjectId): Promise<Task> {
    const task = await this.tasksModel.findById(id);
    return task;
  }

  async update(id: ObjectId, dto: UpdateTaskDto): Promise<ObjectId> {
    const task = await this.tasksModel.findByIdAndUpdate(id, dto);
    return task.id;
  }

  async remove(id: ObjectId): Promise<ObjectId> {
    const removedTask = await this.tasksModel.findByIdAndDelete(id);
    return removedTask.id;
  }
}
