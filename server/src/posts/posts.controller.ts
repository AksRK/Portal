import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {PostsService} from "./posts.service";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Get('/title/:title')
  findByTitle(@Param('title') title: string) {
    return this.postsService.findByTitle(title);
  }

  @Get('/title-url/:titleUrl')
  findByTitleUrl(@Param('titleUrl') titleUrl: string) {
    return this.postsService.findByTitleUrl(titleUrl);
  }
  @Get('/query/all/')
  findAllByQuery(
      @Query('categoryId') categoryId: string,
      @Query('creatorId') creatorId?: string,
  ){
    return this.postsService.findAllByQuery(categoryId, creatorId)
  }
  @Get('/query/one/')
  findOneByQuery(
      @Query('categoryId') categoryId: string,
      @Query('titleUrl') titleUrl: string,
      @Query('creatorId') creatorId?: string,
      ){
    return this.postsService.findOneByQuery(categoryId, titleUrl, creatorId)
  }


  @Get('category/:categoryId')
  findByCategoryId(@Param('categoryId') categoryId: string) {
    return this.postsService.findByCategoryId(categoryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
