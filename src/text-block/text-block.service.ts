import { HttpException, HttpStatus, Injectable, Post, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TextBlock } from "./text-block.model";
import { CreateTextBlockDto } from "./dto/create-text-block.dto";
import { FilesService } from "../files/files.service";
import { CreateFilesDto } from "../files/dto/create-files.dto";
import { AddRoleDto } from "../users/dto/add-role.dto";
import { AddFileDto } from "./dto/add-file.dto";
import { ApiResponse } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UpdateFileDto } from "./dto/update-file.dto";
import anything = jasmine.anything;
import any = jasmine.any;

@Injectable()
export class TextBlockService {
  constructor(@InjectModel(TextBlock) private textBlockRepository:
                typeof TextBlock, private fileService: FilesService) {
  }

  async createTextBlock(dto: CreateTextBlockDto) {
    const textBlock = await this.textBlockRepository.create(dto);
    return textBlock;
  }

  async addFile(dto: AddFileDto) {
    const textBlock = await this.textBlockRepository.findOne({ where: { uniqueName: dto.uniqueName } });
    const file = await this.fileService.getFile(dto.value);
    if (file && textBlock) {
      await this.fileService.fileUpdate({ essenceId: textBlock.id, essenceTable: textBlock.uniqueName }, file.image);
      // console.log(textBlock.id + " " + textBlock.uniqueName);
      // file.essenceId = textBlock.id;
      // file.essenceTable = textBlock.uniqueName;
      await textBlock.$add("files", file.id);
      return dto;
    }
    throw new HttpException("Текстовый блок или файл не найдены", HttpStatus.NOT_FOUND);
  }


  async getAllTextBlocks() {
    const textBlock = await this.textBlockRepository.findAll({ include: { all: true } });
    return textBlock;
  }

  async getFilterTextBlock(dto: CreateTextBlockDto) {

    console.log(dto);
    const textBlock = await this.textBlockRepository.findAll({
      where: { group: dto.group }
    });
    return textBlock;
  }

  async updateTextBlock(dto: CreateTextBlockDto) {
    const curUniqueName = dto.uniqueName;
    const textBlock = await this.textBlockRepository.update(dto,
      { where: { uniqueName: curUniqueName } });
    return textBlock;
  }

  private async _clearField(textBlock: any, allFiles: any) {
    for (const file of allFiles) {
      await textBlock.$has("files", [file.id])
        .then((answ) => {
          if (answ) {
            this.fileService.fileUpdate({ essenceId: null, essenceTable: null }, file.image);
            textBlock.$remove("files", [file.id]);
          }
        });
    }
  }

  async updateFileBlock(dto: UpdateFileDto) {
    const textBlock = await this.textBlockRepository.findOne(
      { where: { uniqueName: dto.uniqueName } });
    const allFiles = await this.fileService.getAllFiles();

    await this._clearField(textBlock, allFiles);

    for (const file of allFiles) {
      if (file.id in dto.updateFilesArray &&
        file.essenceTable === undefined &&
        file.essenceId === undefined) {
        await this.fileService.fileUpdate({ essenceId: textBlock.id, essenceTable: textBlock.uniqueName }, file.image);
        await textBlock.$add("files", [file.id]);
      }
    }
  }

  async deleteTextBlock(dto: CreateTextBlockDto) {
    const curUniqueName = dto.uniqueName;
    const textBlock = await this.textBlockRepository.destroy({
      where: { uniqueName: curUniqueName }
    });
    return textBlock;
  }

}
