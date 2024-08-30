import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument  } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);