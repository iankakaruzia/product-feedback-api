import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ index: true, required: true, unique: true })
  token: string;

  @Prop({ index: true, required: true, unique: true })
  userId: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
