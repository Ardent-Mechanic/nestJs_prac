import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TextBlock } from "./text-block.model";
import { CreateTextBlockDto } from "./dto/create-text-block.dto";
import { FilesService } from "../files/files.service";
import { AddFileDto } from "./dto/add-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { FilterTextBlockDto } from "./dto/filter-text-block.dto";

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
    let textBlock = await this.textBlockRepository.findOne({ where: { uniqueName: dto.uniqueName } });
    const file = await this.fileService.getFile(dto.value);
    if (file && textBlock) {
      await this.fileService.fileUpdate({ essenceId: textBlock.id, essenceTable: textBlock.uniqueName }, file.image);
      await textBlock.$add("files", file.id);
      textBlock = await this.textBlockRepository.findOne({ where: { uniqueName: dto.uniqueName }, include: ['files'] });
      return textBlock;
    }
    throw new HttpException("Текстовый блок или файл не найдены", HttpStatus.NOT_FOUND);
  }


  async getAllTextBlocks() {
    const textBlock = await this.textBlockRepository.findAll({ include: { all: true } });
    return textBlock;
  }

  async getFilterTextBlock(dto: FilterTextBlockDto) {

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
    return {status: 'OK'};
  }

  async deleteTextBlock(dto: CreateTextBlockDto) {
    const curUniqueName = dto.uniqueName;
    await this.textBlockRepository.destroy({
      where: { uniqueName: curUniqueName }
    });
    return {status: 'OK'};
  }

}
