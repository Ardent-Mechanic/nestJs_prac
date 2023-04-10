import {ApiProperty} from "@nestjs/swagger";

export class ShowRoleDto {

  @ApiProperty({example: '1', description: 'идентификатор'})
  readonly id: number;

  @ApiProperty({example: 'ADMIN', description: 'название роли'})
  readonly value: string;

  @ApiProperty({example: 'Администратор', description: 'описание роли'})
  readonly description: string;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата добавления'})
  readonly createdAt: Date;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата последнего обновления'})
  readonly updatedAt: Date;

}