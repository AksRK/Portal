import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Image, ImageSchema} from "./schemas/image.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
