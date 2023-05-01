import {forwardRef, Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./schemas/post.schema";
import {BlogCategory, BlogCategorySchema} from "../blog-category/schemas/blog-category.schema";
import {BlogCategoryModule} from "../blog-category/blog-category.module";
import {CreatorsModule} from "../creators/creators.module";

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: BlogCategory.name, schema: BlogCategorySchema }]),
    forwardRef(() => BlogCategoryModule),
    forwardRef(() => CreatorsModule)
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
