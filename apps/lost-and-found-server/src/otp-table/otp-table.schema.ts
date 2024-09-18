import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpTableDocument = OtpTable & Document;

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt` fields
export class OtpTable {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: Date, default: Date.now, expires: 900 }) // TTL index: expires after 15 minutes
  createdAt: Date;
}

export const OtpTableSchema = SchemaFactory.createForClass(OtpTable);
