import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FilesService } from "./files.service";
import { CreateFilesDto } from "./dto/create-files.dto";
import { Files } from "./files.model";

@ApiTags("Файлы")
@Controller("files")
export class FilesController {
  constructor(private fileService: FilesService) {}

  @Post()
  @ApiOperation({ summary: "Добавить файл в базу" })
  @ApiOkResponse({status: 200, type: Files})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  createFileInfo(@Body() dto: CreateFilesDto, @UploadedFile() image) {
    return this.fileService.createFiles(dto, image);
  }

  @Get()
  @ApiOperation({ summary: "Получить все файлы" })
  @ApiOkResponse({status: 200, type: [Files]})
  @UseGuards(JwtAuthGuard)
  getFilesInfo() {
    return this.fileService.getAllFiles();
  }

  @Delete('/delete')
  @ApiOperation({ summary: "Удалить неиспользуемые файлы" })
  @ApiOkResponse({ status: 200,
    schema: { properties: {deletedImages: {default: [
      "e146-45a3.jpg", "dff7-401e.jpg"
] }}}})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  deleteFileInfo() {
    return this.fileService.deleteNotUsedFiles();
  }
}
