import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);