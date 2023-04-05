import { forwardRef, Module } from "@nestjs/common";
import { TextBlockService } from "./text-block.service";
import { TextBlockController } from "./text-block.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { TextBlock } from "./text-block.model";
import { AuthModule } from "../auth/auth.module";
import { FilesModule } from "../files/files.module";
import { Files } from "../files/files.model";
import { TextBlockFilesModel } from "../files/text-block-files.model";

@Module({
  providers: [TextBlockService],
  controllers: [TextBlockController],
  imports: [
    SequelizeModule.forFeature([TextBlock, TextBlockFilesModel, Files]),
    forwardRef(() => AuthModule),
    FilesModule
  ]
})
export class TextBlockModule {}
