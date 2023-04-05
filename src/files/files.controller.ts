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
import { ApiResponse } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FilesService } from "./files.service";
import { CreateFilesDto } from "./dto/create-files.dto";

@Controller("files")
export class FilesController {
  constructor(private fileService: FilesService) {}
  @ApiResponse({status: 200})
  // @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  createFileInfo(@Body() dto: CreateFilesDto, @UploadedFile() image) {
    return this.fileService.createFiles(dto, image);
  }

  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  //@UseGuards(RolesGuard)
  @Get()
  getFilesInfo() {
    return this.fileService.getAllFiles();
  }

  @ApiResponse({status: 200})
  // // @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('/delete')
  deleteFileInfo() {
    return this.fileService.deleteNotUsedFiles();
  }
}
