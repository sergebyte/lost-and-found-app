import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { Profile } from './schemas/profiles.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUser(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async createUserAndProfile(email: string, hashedOtp: string): Promise<User> {
    const newUser = new this.userModel({
      email,
      otp: hashedOtp,
    });
    return await newUser.save();
  }

  async updateUserOtp(
    user: User,
    hashedOtp: string,
    otpGeneratedAt: Date,
  ): Promise<User> {
    user.otp = hashedOtp;
    user.otpGeneratedAt = otpGeneratedAt;
    return await user.save();
  }

  async registerAndRemoveUserOtp(user: User): Promise<User> {
    if (!user.registered) {
      user.registered = true;
      const newProfile = new this.profileModel({
        userId: user._id,
      });
      await newProfile.save();
      user.profileId = newProfile._id as Types.ObjectId;
    }
    user.otp = null;
    user.otpGeneratedAt = null;
    return await user.save();
  }
}
