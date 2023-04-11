import { BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Profile } from "../profile/profile.model";

// import {Post} from "../posts/posts.model";


interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'user@mau.iu', description: 'Почта'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({example: '$2a$05$Xo1bVOGMEaU2', description: 'пароль'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({example: 'true', description: 'бан пользователя'})
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({example: 'забанен по причине ...', description: 'причина бана'})
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата регистрации'})
  readonly createdAt: Date;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата последнего обновления'})
  readonly updatedAt: Date;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => Profile)
  profile: Profile;

}
