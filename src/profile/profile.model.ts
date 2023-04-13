import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { User } from "../users/users.model";


interface ProfileCreationAttrs {
  firstName: string;
  secondName: string;
  phoneNumber: string;
  age: number;
}

@Table({tableName: 'profiles'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {

  @ApiProperty({example: '1', description: 'идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Иван', description: 'имя'})
  @Column({type: DataType.STRING, allowNull: false})
  firstName: string;

  @ApiProperty({example: 'Иванов', description: 'фамилия'})
  @Column({type: DataType.STRING, allowNull: false})
  secondName: string;

  @ApiProperty({example: '+71233211212', description: 'телефонный номе'})
  @Column({type: DataType.STRING, allowNull: false})
  phoneNumber: string;

  @ApiProperty({example: '20', description: 'возраст'})
  @Column({type: DataType.INTEGER, allowNull: false})
  age: number;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата регистрации'})
  readonly createdAt: Date;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата последнего обновления'})
  readonly updatedAt: Date;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, unique: true})
  userId: number;

  @BelongsTo(() => User)
  users: User;

}