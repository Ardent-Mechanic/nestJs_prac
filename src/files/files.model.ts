import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { TextBlock } from "../text-block/text-block.model";
import { TextBlockFilesModel } from "./text-block-files.model";
import { ApiProperty } from "@nestjs/swagger";


interface FilesCreationAttrs {
  image: string;
  essenceId: number;
  essenceTable: string;
}

@Table({ tableName: "files" })
export class Files extends Model<Files, FilesCreationAttrs> {

  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "1", description: "Уникальный идентификатор текстового блока" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  essenceId: number;

  @ApiProperty({ example: "my-super-div", description: "Уникальное название текстового блока" })
  @Column({ type: DataType.STRING, allowNull: true })
  essenceTable: string;

  @ApiProperty({example: '21f6d13b-813f-41fa-8bcd-da5f2061596d.jpg', description: 'название файла'})
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @BelongsToMany(() => TextBlock,
    () => TextBlockFilesModel)
  textBlocks: TextBlock[];

}