import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query,
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

  @Get('/query/one/')
  async getOne(
      @Query('id') id?: string,
      @Query('title') title?: string,
      @Query('titleUrl') titleUrl?: string,
      ) {
    return this.blogCategoryService.findOneByQuery(id, title, titleUrl)
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