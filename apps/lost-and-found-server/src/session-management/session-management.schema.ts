import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the Session document interface
export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false, index: true, expires: '30d' })
  expiresAt: Date;
}

// Create the schema factory for the Session schema
export const SessionSchema = SchemaFactory.createForClass(Session);
