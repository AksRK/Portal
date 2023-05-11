import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UseFilters,
} from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategoryDocument } from "./schemas/blog-category.schema";
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';


@Controller('blog/category')
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {
  }

  @Post()
  async create(
      @Body() createBlogCategoryDto: CreateBlogCategoryDto,
  ): Promise<BlogCategoryDocument> {
    return this.blogCategoryService.create(createBlogCategoryDto);
  }

  @Get()
  async findAll(): Promise<BlogCategoryDocument[]> {
    return this.blogCategoryService.findAll();
  }

  @Get('admin')
  async findAllForAdmin(): Promise<BlogCategoryDocument[]> {
    return this.blogCategoryService.findAllForAdmin();
  }

  @Get(':id')
  async findById(
      @Param('id') id: string,
  ): Promise<BlogCategoryDocument> {
    return this.blogCategoryService.findById(id);
  }

  @Get('title/:title')
  async findByTitle(
      @Param('title') title: string,
  ): Promise<BlogCategoryDocument> {
    return this.blogCategoryService.findByTitle(title);
  }

  @Get('url/:url')
  async findByUrl(
      @Param('url') url: string,
  ): Promise<BlogCategoryDocument> {
    return this.blogCategoryService.findByUrl(url);
  }

  @Patch(':id')
  async update(
      @Param('id') id: string,
      @Body() updateBlogCategoryDto: UpdateBlogCategoryDto,
  ): Promise<BlogCategoryDocument> {
    return this.blogCategoryService.update(id, updateBlogCategoryDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogCategoryService.remove(id);
  }
}