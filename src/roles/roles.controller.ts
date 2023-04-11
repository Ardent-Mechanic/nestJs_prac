import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import { RolesGuard } from "../auth/roles.guard";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../users/users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { Role } from "./roles.model";
import { Roles } from "../auth/roles-auth.decorator";

@ApiTags("Роли")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()
    @ApiOperation({ summary: "Создать роль" })
    @ApiOkResponse({status: 200, type: Role})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get('/:value')
    @ApiOperation({ summary: "Получить роль по значению" })
    @ApiOkResponse({status: 200, type: Role})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getByValue(@Param('value') value: string) {
        console.log('123123123123');
        return this.roleService.getRoleByValue(value);
    }

    @Get()
    @ApiOperation({ summary: "Получить все роли" })
    @ApiResponse({status: 200, type: [Role]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getRoles(){
        return this.roleService.getAllRoles();
    }
}
