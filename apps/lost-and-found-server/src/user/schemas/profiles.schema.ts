import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({ type: String, default: null })
  firstName: string;

  @Prop({ type: String, default: null })
  lastName: string;

  @Prop({ type: String, default: null })
  photo: string;

  @Prop({ type: String, default: null })
  phoneNumber: string;

  @Prop({ type: String, default: 'User' })
  userRole: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
