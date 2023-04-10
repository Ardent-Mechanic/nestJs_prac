import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiHeader,
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
import { ShowUserDto } from "./dto/show-user.dto";
import { CreateRoleDto } from "../roles/dto/create-role.dto";
import { ShowRoleDto } from "../roles/dto/show-role.dto";
import { ApiShowUserResponse } from "./decorators/show-user.response";


@ApiTags("Пользователи")
@ApiExtraModels(CreateUserDto)
@Controller("users")
export class UsersController {

  constructor(private usersService: UsersService) {
  }


  @Get()
  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiExtraModels(ShowUserDto, ShowRoleDto)
  @ApiShowUserResponse(ShowRoleDto)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  getAll() {
    return this.usersService.getAllUsers();

  }

  @Post("/role/add")
  @ApiOperation({ summary: "Выдать роль" })
  @ApiExtraModels(ShowUserDto, ShowRoleDto)
  @ApiShowUserResponse(ShowRoleDto)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  addRole(@Body() dto: AddRoleDto) {
    console.log(AddRoleDto);
    return this.usersService.addRole(dto);
  }

  @Post("/ban")
  @ApiOperation({ summary: "Забанить пользователя" })
  @ApiExtraModels(ShowUserDto)
  @ApiResponse({ status: 200, type: ShowUserDto })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
