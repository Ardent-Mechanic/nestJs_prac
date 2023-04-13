import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { InjectModel } from "@nestjs/sequelize";
import { Files } from "./files.model";
import { CreateFilesDto } from "./dto/create-files.dto";
import { Op, where } from "sequelize";

@Injectable()
export class FilesService {

  constructor(@InjectModel(Files) private filesRepository: typeof Files) {
  }

  async convertFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "static");
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException("Произошла ошибка при записи файла", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createFiles(dto: CreateFilesDto, image: any) {
    const fileName = await this.convertFile(image);
    const file = await this.filesRepository.create({
      ...dto, image: fileName
    });
    return file;
  }

  async getAllFiles() {

    const files = await this.filesRepository.findAll();
    return files;
  }

  async fileUpdate(dto, image: string){
    await this.filesRepository.update(dto, {where: { image }});
    return {status: 'OK'};

  }

  async deleteNotUsedFiles() {

    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() - 1);

    const conditions = {
      [Op.or]: [
        { createdAt: { [Op.lt]: dateNow } },
        { [Op.and]: [
            { essenceId: { [Op.eq]: null } },
            { essenceTable: { [Op.eq]: null} }
          ]}]};

    const notUsedFiles = await this.filesRepository.findAll({where: conditions});
    const filesName = notUsedFiles.map(value => value.image);
    // await this.filesRepository.destroy({where: conditions});

    // this._deleteLocalFile(filesName)

    return {deletedImages: filesName};
  }

  async getFile(image: string) {
    const files = await this.filesRepository.findOne({
      where: { image }
    });
    return files;
  }

  _deleteLocalFile(filesName: Array<string>) {
    let fs = require("fs");
    for (const name of filesName ){
      fs.unlink(`dist/static/${name}`, err => {
        if (err) throw err; // не удалось удалить файл
        console.log("Файл успешно удалён");
      });
    }
  }

}
