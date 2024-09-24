import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema, Profile } from './schemas/profiles.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
