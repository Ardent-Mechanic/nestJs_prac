import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType } from "sequelize-typescript";
import { IsString } from "class-validator";

export class CreateFilesDto {

  @ApiProperty({example: '21f6d13b-813f-41fa-8bcd-da5f2061596d.jpg', description: 'название файла'})
  readonly image: string;

  @ApiProperty({ example: "1", description: "Уникальный идентификатор текстового блока (не обязательный параметр)" })
  essenceId: number;

  @ApiProperty({ example: "my-super-div", description: "Уникальное название текстового блока (не обязательный параметр)" })
  essenceTable: string;
}