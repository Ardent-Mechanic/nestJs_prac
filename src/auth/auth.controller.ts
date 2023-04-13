import {Body, Controller, Post} from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import { User } from "../users/users.model";
import { JwtModule, JwtService } from "@nestjs/jwt";


//Promise<{token: string}>
@ApiTags('Авторизация')
@Controller('auth')
@ApiExtraModels()
export class AuthController {

    constructor(private authService: AuthService) {}
    @Post('/login')
    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiOkResponse({ status: 200,
        schema: { properties: {token: {default: 'eyJlbWFpbCI6ImFkbWluMUBtYXUuY29t' }}}})

    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiOkResponse({ status: 200,
        schema: { properties: {token: {default: 'eyJlbWFpbCI6ImFkbWluMUBtYXUuY29t' }}}})
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
