import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'название роли'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;

    @ApiProperty({example: 'Администратор', description: 'описание роли'})
    @IsString({message: 'Должно быть строкой'})
    readonly description: string;
}
