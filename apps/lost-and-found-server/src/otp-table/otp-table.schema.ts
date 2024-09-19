import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpTableDocument = OtpTable & Document;

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt` fields
export class OtpTable {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  expiryDate: Date;
}

export const OtpTableSchema = SchemaFactory.createForClass(OtpTable);

// Ensure TTL index is set on expiryDate
OtpTableSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });
