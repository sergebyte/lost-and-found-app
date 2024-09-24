import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from './profiles.schema';

@Schema()
export class User extends Document {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: Boolean, default: false })
  registered: boolean;

  @Prop({ type: Boolean, default: false })
  completedProfile: boolean;

  @Prop({ type: String, default: null })
  otp: string;

  @Prop({ type: Date, default: Date.now })
  otpGeneratedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Profile', default: null })
  profileId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index(
  { otpGeneratedAt: 1 },
  { expireAfterSeconds: 900, partialFilterExpression: { registered: false } },
);
