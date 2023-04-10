import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProfileModule } from './profile/profile.module';
import * as path from 'path';
import { Profile } from "./profile/profile.model";
import { TextBlockModule } from './text-block/text-block.module';
import { TextBlock } from "./text-block/text-block.model";
import { Files } from "./files/files.model";
import { TextBlockFilesModel } from "./files/text-block-files.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve( __dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, Profile, UserRoles,
                TextBlock, Files, TextBlockFilesModel],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProfileModule,
        TextBlockModule,
        FilesModule
    ]
})
export class AppModule {}
