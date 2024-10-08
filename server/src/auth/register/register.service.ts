import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { User, UserDocument } from '../../users/schemas/user.schema';

@Injectable()
export class RegisterService {

  constructor(@InjectModel(User.name) private tasksModel: Model<UserDocument>) {}
}
