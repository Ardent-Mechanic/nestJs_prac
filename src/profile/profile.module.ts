import { forwardRef, Module } from "@nestjs/common";
import { ProfileController } from './profile.controller';
import {ProfilesService } from "./profiles.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Profile} from "./profile.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [ProfilesService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    forwardRef(() => AuthModule)
  ],
})
export class ProfileModule {}
