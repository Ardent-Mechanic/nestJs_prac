import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import {ProfilesService} from "./profiles.service";
import {CreateProfileDto } from "./dto/create-profile.dto";
import { RolesGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { ApiResponse } from "@nestjs/swagger";

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfilesService) {}

  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  //@UseGuards(RolesGuard)
  @Post()
  createProfileInfo(@Body() dto: CreateProfileDto, @Req() req: any) {
    const user = req.user;
    dto.userId = user.id;
    return this.profileService.createProfile(dto);
  }

  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  //@UseGuards(RolesGuard)
  @Get()
  getProfileInfo(@Req() req: any) {
    const user = req.user;
    console.log(req.user);
    return this.profileService.getProfile(user.id);
  }

  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  updateProfileInfo(@Body() dto: CreateProfileDto, @Req() req) {
    return this.profileService.updateProfile(req, dto);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  deleteProfileInfo(@Body() dto: CreateProfileDto, @Req() req) {
    return this.profileService.deleteProfile(req, dto);
  }
}
