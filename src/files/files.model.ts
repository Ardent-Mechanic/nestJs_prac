import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { TextBlock } from "../text-block/text-block.model";
import { TextBlockFilesModel } from "./text-block-files.model";


interface FilesCreationAttrs {
  image: string;
  essenceId: number;
  essenceTable: string;
}

@Table({ tableName: "files" })
export class Files extends Model<Files, FilesCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  essenceId: number;

  @Column({ type: DataType.STRING, allowNull: true })
  essenceTable: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @BelongsToMany(() => TextBlock,
    () => TextBlockFilesModel)
  textBlocks: TextBlock[];

}