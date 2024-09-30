import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Announcement extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  image?: string;

  @Prop({ type: { type: String, enum: ['Point'], default: 'Point' } })
  locationType: string;

  @Prop({ type: [Number] })
  location?: number[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
AnnouncementSchema.index({ location: '2dsphere' });
