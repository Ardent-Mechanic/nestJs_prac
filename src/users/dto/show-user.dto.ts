import {ApiProperty} from "@nestjs/swagger";

export class ShowUserDto {

  @ApiProperty({example: '1', description: 'идентификатор'})
  readonly id: number;

  @ApiProperty({example: 'user@mau.iu', description: 'Почта'})
  readonly email: string;

  @ApiProperty({example: '$2a$05$Xo1bVOGMEaU2', description: 'пароль'})
  readonly password: string;

  @ApiProperty({example: 'true', description: 'бан пользователя'})
  readonly banned: boolean;

  @ApiProperty({example: 'забанен по причине ...', description: 'причина бана'})
  readonly banReason: string;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата регистрации'})
  readonly createdAt: Date;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата последнего обновления'})
  readonly updatedAt: Date;
}
