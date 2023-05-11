import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {PostsService} from "./posts.service";
import {DEFAULT_DOCS_LIMIT, DEFAULT_PAGE_PAGINATION} from "../common/constants";

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

  @Get('/admin/')
  findAllForAdmin() {
    return this.postsService.findAllForAdmin();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Get('/title/all/:title')
  findAllByTitle(@Param('title') title: string) {
    return this.postsService.findAllByTitle(title);
  }

  @Get('/query/all/')
  findAllByQuery(
      @Query('categoryId') categoryId: string,
      @Query('creatorId') creatorId?: string,
      @Query('page') page: string = DEFAULT_PAGE_PAGINATION,
      @Query('limit') limit: string = DEFAULT_DOCS_LIMIT,
      @Query('title') title?: string,
  ){
    return this.postsService.findAllByQuery(categoryId, creatorId, page, limit, title)
  }
  @Get('/query/one/')
  findOneByQuery(
      @Query('categoryId') categoryId: string,
      @Query('titleUrl') titleUrl: string,
      @Query('creatorId') creatorId?: string,
      ){
    return this.postsService.findOneByQuery(categoryId, titleUrl, creatorId)
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
