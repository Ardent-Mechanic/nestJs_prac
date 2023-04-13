import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPhoneNumber, IsString, Length, Max, Min } from "class-validator";


export class CreateProfileDto {

  @ApiProperty({ example: "Иван", description: "Имя" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "Не меньше 4 и не больше 16" })
  readonly firstName: string;
  @ApiProperty({ example: "Иванов", description: "Фамилия" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "Не меньше 4 и не больше 16" })
  readonly secondName: string;
  @ApiProperty({ example: "18", description: "возраст" })
  @IsInt({ message: "Должно быть числом" })
  @Min(0)
  @Max(100)
  readonly age: number;

  @ApiProperty({ example: "+71231231212", description: "номер телефона" })
  @IsPhoneNumber("RU")
  @Length(12, 12, { message: "ровно 12 символов" })
  readonly phoneNumber: string;

  @ApiProperty({ example: "1", description: "id пользователя (не обязательный параметр)" })
  userId: number;
}
