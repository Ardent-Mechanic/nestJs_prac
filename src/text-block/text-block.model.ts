import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Files } from "../files/files.model";
import { TextBlockFilesModel } from "../files/text-block-files.model";
import { ApiProperty } from "@nestjs/swagger";


interface TextBlockCreationAttrs {
  uniqueName: string;
  blockName: string;
  info: string;
  group: string;
}

@Table({tableName: 'text_block'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {

  @ApiProperty({example: '1', description: 'идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'my-super-div', description: 'уникальное название текстового блока'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  uniqueName: string;

  @ApiProperty({example: 'super-div', description: 'название текстового блока'})
  @Column({type: DataType.STRING, allowNull: false})
  blockName: string;

  @ApiProperty({example: 'основной текстовый блок', description: 'описание текстового блока'})
  @Column({type: DataType.STRING, allowNull: true})
  info: string;

  @ApiProperty({example: 'div', description: 'группа текстового блока'})
  @Column({type: DataType.STRING, allowNull: false})
  group: string;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата регистрации'})
  readonly createdAt: Date;

  @ApiProperty({example: '2023-04-05T10:16:37.003Z', description: 'дата последнего обновления'})
  readonly updatedAt: Date;

  @BelongsToMany(() => Files,
    () => TextBlockFilesModel)
  files: Files[];

}