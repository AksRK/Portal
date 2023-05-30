import {forwardRef, Module} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Image, ImageSchema} from "./schemas/image.schema";
import {PostsModule} from "../posts/posts.module";
import {CreatorsModule} from "../creators/creators.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    forwardRef(() => PostsModule),
    forwardRef(() => CreatorsModule)
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
