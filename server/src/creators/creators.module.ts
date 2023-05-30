import {forwardRef, Module} from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Creator, CreatorSchema} from "./schemas/creator.schema";
import {FilesModule} from "../files/files.module";

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }]),
    forwardRef(() => FilesModule)
  ],
  controllers: [CreatorsController],
  providers: [CreatorsService],
  exports: [CreatorsService]
})
export class CreatorsModule {}
