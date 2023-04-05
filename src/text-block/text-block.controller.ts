import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TextBlockService } from "./text-block.service";
import { CreateTextBlockDto } from "./dto/create-text-block.dto";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { AddFileDto } from "./dto/add-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";

@Controller('text-block')
export class TextBlockController {

  constructor(private textBlockService: TextBlockService) {}

  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  createTextBlockInfo(@Body() dto: CreateTextBlockDto) {
    console.log(dto);
    return this.textBlockService.createTextBlock(dto);
  }

  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/file/add')
  addTextBlockInfo(@Body() dto: AddFileDto){
    return this.textBlockService.addFile(dto);
  }

  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Get()
  getTextBlockInfo() {
    return this.textBlockService.getAllTextBlocks();
  }

  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/filter')
  filterTextBlockInfo(@Body() dto: CreateTextBlockDto) {
    return this.textBlockService.getFilterTextBlock(dto);
  }


  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Patch('/update')
  updateTextBlockInfo(@Body() dto: CreateTextBlockDto) {
    return this.textBlockService.updateTextBlock(dto);
  }

  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Patch('/update/files')
  updateFilesIntoTextBlock(@Body() dto: UpdateFileDto){
    return this.textBlockService.updateFileBlock(dto);
  }
  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('/delete')
  deleteTextBlockInfo(@Body() dto: CreateTextBlockDto) {
    return this.textBlockService.deleteTextBlock(dto);
    }

}
