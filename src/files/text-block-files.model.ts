import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { TextBlock } from "../text-block/text-block.model";
import { Files } from "./files.model";


@Table({tableName: 'text_block_files', createdAt: false, updatedAt: false})
export class TextBlockFilesModel extends Model<TextBlockFilesModel> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => TextBlock)
  @Column({type: DataType.INTEGER})
  textBlockId: number;

  @ForeignKey(() => Files)
  @Column({type: DataType.INTEGER})
  fileId: number;

}