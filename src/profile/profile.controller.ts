import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import {ProfilesService} from "./profiles.service";
import {CreateProfileDto } from "./dto/create-profile.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiOkResponseShowProfile } from "./decorators/user-profile.response";
import { User } from "../users/users.model";
import { Profile } from "./profile.model";

@ApiTags("Профили")
@Controller('profile')
@ApiExtraModels(Profile, User)
@ApiBearerAuth('JWT-auth')
export class ProfileController {
  constructor(private profileService: ProfilesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Создать профиль" })
  @ApiOkResponseShowProfile(User)
  @UseGuards(JwtAuthGuard)
  createProfileInfo(@Body() dto: CreateProfileDto, @Req() req: any) {
    const user = req.user;
    dto.userId = user.id;
    return this.profileService.createProfile(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить профиль" })
  @ApiOkResponseShowProfile(User)
  @UseGuards(JwtAuthGuard)
  getProfileInfo(@Req() req: any) {
    const user = req.user;
    return this.profileService.getProfile(user.id);
  }

  @Patch('/update')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновить профиль" })
  @ApiOkResponse({ status: 200,
    schema: { properties: {status: {default: 'OK' }}}})
  @UseGuards(JwtAuthGuard)
  updateProfileInfo(@Body() dto: CreateProfileDto, @Req() req) {
    console.log(dto);
    return this.profileService.updateProfile(req, dto);
  }

  @Delete('/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить профиль" })
  @ApiOkResponse({ status: 200,
    schema: { properties: {status: {default: 'OK' }}}})
  @UseGuards(JwtAuthGuard)
  deleteProfileInfo(@Body() dto: CreateProfileDto, @Req() req) {
    return this.profileService.deleteProfile(req, dto);
  }
}
