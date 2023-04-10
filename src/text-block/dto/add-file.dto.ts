import {IsNumber, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddFileDto {

  @ApiProperty({example: '21f6d13b-813f-41fa-8bcd-da5f2061596d.jpg', description: 'название файла'})
  @IsString({message: "Должно быть строкой"})
  readonly value: string;

  @ApiProperty({example: 'my-super-div', description: 'уникальное название текстового блока'})
  @IsString({message: "Должно быть строкой"})
  readonly uniqueName: string;
}
