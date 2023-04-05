import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Files } from "../files/files.model";
import { TextBlockFilesModel } from "../files/text-block-files.model";


interface TextBlockCreationAttrs {
  uniqueName: string;
  blockName: string;
  info: string;
  group: string;
}

@Table({tableName: 'text_block'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  uniqueName: string;

  @Column({type: DataType.STRING, allowNull: false})
  blockName: string;

  @Column({type: DataType.STRING, allowNull: true})
  info: string;

  @Column({type: DataType.STRING, allowNull: false})
  group: string;

  @BelongsToMany(() => Files,
    () => TextBlockFilesModel)
  files: Files[];

}