import {forwardRef, Module} from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategoryController } from './blog-category.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {BlogCategory, BlogCategorySchema} from "./schemas/blog-category.schema";
import {PostsModule} from "../posts/posts.module";

@Module({
  imports:[
    MongooseModule.forFeature([{ name: BlogCategory.name, schema: BlogCategorySchema }]),
    forwardRef(() => PostsModule)
  ],
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService],
  exports: [BlogCategoryService]
})
export class BlogCategoryModule {}
