import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTextBlockDto {

  @ApiProperty({example: 'my-super-div', description: 'уникальное название текстового блока'})
  @IsString({message: "Должно быть строкой"})
  readonly uniqueName: string;

  @ApiProperty({example: 'super-div', description: 'название текстового блока'})
  @IsString({message: "Должно быть строкой"})
  readonly blockName: string;

  @ApiProperty({example: 'основной текстовый блок', description: 'описание текстового блока'})
  @IsString({message: "Должно быть строкой"})
  readonly info: string;

  @ApiProperty({example: 'div', description: 'группа текстового блока'})
  @IsString({message: "Должно быть строкой"})
  readonly group: string;
}