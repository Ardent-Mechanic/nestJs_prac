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
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TextBlockService } from "./text-block.service";
import { CreateTextBlockDto } from "./dto/create-text-block.dto";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { AddFileDto } from "./dto/add-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { FilterTextBlockDto } from "./dto/filter-text-block.dto";
import { TextBlock } from "./text-block.model";
import { ApiOkResponseShowTextBlock } from "./decorators/text-block-files.respons";
import { Files } from "../files/files.model";

@ApiTags("Текстовые блоки")
@Controller('text-block')
@ApiExtraModels(Files)
export class TextBlockController {

  constructor(private textBlockService: TextBlockService) {}

  @Post()
  @ApiOperation({ summary: "Создаь текстовый блок" })
  @ApiResponse({status: 200, type: TextBlock})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  createTextBlockInfo(@Body() dto: CreateTextBlockDto) {
    console.log(dto);
    return this.textBlockService.createTextBlock(dto);
  }

  @Post('/file/add')
  @ApiOperation({ summary: "Добавить файл в текстовый блок" })
  @ApiOkResponseShowTextBlock(Files)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  addTextBlockInfo(@Body() dto: AddFileDto){
    return this.textBlockService.addFile(dto);
  }

  @Get()
  @ApiOperation({ summary: "Получить все текстовые блоки" })
  @ApiOkResponseShowTextBlock(Files)
  @UseGuards(JwtAuthGuard)
  getTextBlockInfo() {
    return this.textBlockService.getAllTextBlocks();
  }

  @Post('/filter')
  @ApiOperation({ summary: "Получить все текстовые блоки определенной группы" })
  @ApiOkResponse({status: 200, type: TextBlock})
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  filterTextBlockInfo(@Body() dto: FilterTextBlockDto) {
    return this.textBlockService.getFilterTextBlock(dto);
  }

  @Patch('/update')
  @ApiOperation({ summary: "Обновить текстовый блок" })
  @ApiOkResponse({status: 200, type: TextBlock})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  updateTextBlockInfo(@Body() dto: CreateTextBlockDto) {
    return this.textBlockService.updateTextBlock(dto);
  }

  @Patch('/update/files')
  @ApiOperation({ summary: "Обновить файлы в текстовом блоке" })
  @ApiOkResponseShowTextBlock(Files)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  updateFilesIntoTextBlock(@Body() dto: UpdateFileDto){
    return this.textBlockService.updateFileBlock(dto);
  }

  @Delete('/delete')
  @ApiOperation({ summary: "Удалить текстовый блок" })
  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  deleteTextBlockInfo(@Body() dto: CreateTextBlockDto) {
    return this.textBlockService.deleteTextBlock(dto);
    }

}
