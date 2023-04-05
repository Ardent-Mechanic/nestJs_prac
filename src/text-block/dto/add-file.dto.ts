import {IsNumber, IsString} from "class-validator";

export class AddFileDto {
  @IsString({message: "Должно быть строкой"})
  readonly value: string;
  @IsString({message: "Должно быть строкой"})
  readonly uniqueName: string;
}
