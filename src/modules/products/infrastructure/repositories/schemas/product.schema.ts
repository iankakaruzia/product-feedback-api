import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  description: string;

  @Prop({ index: true, required: true, unique: true })
  id: string;

  @Prop({ index: true, required: true })
  ownerId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
