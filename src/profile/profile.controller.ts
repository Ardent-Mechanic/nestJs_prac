import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import {ProfilesService} from "./profiles.service";
import {CreateProfileDto } from "./dto/create-profile.dto";
import { RolesGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  //@UseGuards(RolesGuard)
  @Post()
  createProfileInfo(@Body() dto: CreateProfileDto, @Req() req: any) {
    const user = req.user;
    dto.userId = user.id;
    return this.profileService.createProfile(dto);
  }

  @UseGuards(JwtAuthGuard)
  //@UseGuards(RolesGuard)
  @Get()
  getProfileInfo(@Req() req: any) {
    const user = req.user;
    return this.profileService.getProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  @Patch('/update')
  updateProfileInfo(@Body() dto: CreateProfileDto, @Req() req) {
    const user = req.user;
    dto.userId = user.id;
    console.log(dto);
    return this.profileService.updateProfile(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Delete('/delete')
  deleteProfileInfo(@Req() req) {
    const user = req.user;
    return this.profileService.deleteProfile(user.id);
  }
}
