import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {

    @ApiProperty({example: '1', description: 'идентификатор пользователя'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;

    @ApiProperty({example: 'забанен по причине ...', description: 'причина бана'})
    @IsString({message: "Должно быть строкой"})
    readonly banReason: string;
}
