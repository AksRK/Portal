import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import {DEFAULT_DOCS_LIMIT, DEFAULT_PAGE_PAGINATION} from "../common/constants";

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  create(@Body() createCreatorDto: CreateCreatorDto) {
    return this.creatorsService.create(createCreatorDto);
  }

  @Get()
  findAll(
      @Query('page') page: string = DEFAULT_PAGE_PAGINATION,
      @Query('limit') limit: string = DEFAULT_DOCS_LIMIT,
  ) {
    return this.creatorsService.findAll(page,limit);
  }

  @Get('/admin/list')
  findAllForAdmin() {
    return this.creatorsService.findAllForAdmin();
  }
  @Get('/query/one')
  findOne(
      @Query('id') id?: string,
      @Query('fullName') fullName?: string,
      @Query('nickName') nickName?: string,
  ) {
    return this.creatorsService.findOneByQuery(id, fullName, nickName)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    return this.creatorsService.update(id, updateCreatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creatorsService.remove(id);
  }
}
