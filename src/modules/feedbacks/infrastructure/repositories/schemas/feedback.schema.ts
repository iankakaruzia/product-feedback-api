import {
  Categories,
  Category,
} from '@modules/feedbacks/domain/types/category.type';
import { Status, Statuses } from '@modules/feedbacks/domain/types/status.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Feedback {
  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  _id: number;

  @Prop({
    enum: Object.values(Categories),
    required: true,
    type: String,
  })
  category: Category;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ index: true, ref: 'User', required: true, type: Types.ObjectId })
  owner: Types.ObjectId;

  @Prop({ index: true, ref: 'Product', required: true, type: Types.ObjectId })
  product: Types.ObjectId;

  @Prop({
    default: Statuses.Suggestion,
    enum: Object.values(Statuses),
    required: true,
    type: String,
  })
  status: Status;

  @Prop({ required: true })
  title: string;

  @Prop()
  updatedAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
