import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiHeader, ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath
} from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateRoleDto } from "../roles/dto/create-role.dto";
import { ShowRoleDto } from "../roles/dto/show-role.dto";
import { ApiOkResponseShowUser } from "./decorators/user-roles.response";
import { CreateProfileDto } from "../profile/dto/create-profile.dto";
import { Role } from "../roles/roles.model";


@ApiTags("Пользователи")
@Controller("users")
@ApiExtraModels(Role)
export class UsersController {

  constructor(private usersService: UsersService) {
  }


  @Get()
  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiOkResponseShowUser(CreateProfileDto)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  getAll() {
    return this.usersService.getAllUsers();

  }

  @Post("/role/add")
  @ApiOperation({ summary: "Выдать роль" })
  @ApiOkResponseShowUser(Role)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  addRole(@Body() dto: AddRoleDto) {
    console.log(AddRoleDto);
    return this.usersService.addRole(dto);
  }

  @Post("/ban")
  @ApiOperation({ summary: "Забанить пользователя" })
  @ApiOkResponse({ status: 200, type: User })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
