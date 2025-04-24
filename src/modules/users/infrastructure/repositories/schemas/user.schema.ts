import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({
    index: true,
    required: true,
    type: Types.ObjectId,
    unique: true,
  })
  _id: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ index: true, required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
