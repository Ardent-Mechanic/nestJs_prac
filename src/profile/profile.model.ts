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

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;


  @Column({type: DataType.STRING, allowNull: false})
  firstName: string;

  @Column({type: DataType.STRING, allowNull: false})
  secondName: string;

  @Column({type: DataType.STRING, allowNull: false})
  phoneNumber: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  age: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, unique: true})
  userId: number;

  @BelongsTo(() => User)
  users: User;

}