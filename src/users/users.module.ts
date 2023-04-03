import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import {Profile} from "../profile/profile.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { ProfileModule } from "../profile/profile.module";

// import {Post} from "../posts/posts.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    // SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    SequelizeModule.forFeature([User, Profile, Role, UserRoles]),
    RolesModule,
    ProfileModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {
}
