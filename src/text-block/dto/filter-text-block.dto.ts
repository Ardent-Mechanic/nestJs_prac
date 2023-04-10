import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class FilterTextBlockDto {

  @ApiProperty({example: 'div', description: 'группа текстового блока'})
  @IsString({message: "Должно быть строкой"})
  readonly group: string;
}