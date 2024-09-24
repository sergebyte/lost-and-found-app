import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Items extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  photo: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  userId: Types.ObjectId;
}

export const ItemsSchema = SchemaFactory.createForClass(Items);
