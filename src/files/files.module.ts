import { forwardRef, Module } from "@nestjs/common";
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { Files } from "./files.model";
import { TextBlockFilesModel } from "./text-block-files.model";
import { TextBlock } from "../text-block/text-block.model";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [
    SequelizeModule.forFeature([Files, TextBlockFilesModel, TextBlock]),
    forwardRef(() => AuthModule)
  ]
})
export class FilesModule {}
