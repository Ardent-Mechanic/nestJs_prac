import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateFileDto {

  @ApiProperty({example: 'my-super-div', description: 'уникальное название текстового блока'})
  @IsString({message: 'Должно быть строкой'})
  readonly uniqueName: string;

  @ApiProperty({example: [1, 2, 3], description: 'массив индексов файлов'})
  @IsArray({message: 'Должн быть массивом'})
  readonly updateFilesArray: Array<number>;
}