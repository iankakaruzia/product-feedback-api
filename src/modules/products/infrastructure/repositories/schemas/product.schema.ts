import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Product {
  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  _id: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  description: string;

  @Prop({ index: true, ref: 'User', required: true, type: Types.ObjectId })
  owner: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
