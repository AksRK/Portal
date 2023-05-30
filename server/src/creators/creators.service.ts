import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import {Creator, CreatorDocument} from "./schemas/creator.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model, PaginateModel} from "mongoose";
import {FilesService} from "../files/files.service";

@Injectable()
export class CreatorsService {
  constructor(
      @InjectModel(Creator.name) private creatorModel: Model<CreatorDocument>,
      @InjectModel(Creator.name) private creatorModelPaginate: PaginateModel<CreatorDocument>,
      private  filesService: FilesService
  ) {}
  async create(createCreatorDto: CreateCreatorDto) {
    const creatorExist = await this.creatorModel.findOne({nickName: createCreatorDto.nickName})
    if (creatorExist) {
      throw new BadRequestException('Creator already exists');
    }
    const newCreator = await this.creatorModel.create(createCreatorDto)

    return newCreator.save()
  }

  async findAll(page: string, limit: string) {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: [
        {path:'photo'}
      ]
    }
    return this.creatorModelPaginate.paginate({}, options)
  }

  async findAllForAdmin() {
    return this.creatorModel.find().select('_id fullName nickName').exec()
  }
  async findOneByQuery(id: string, fullName: string, nickName: string) {
    const params = {}

    if (!id && !fullName && !nickName) throw new NotFoundException()

    if (id) params['_id'] = id
    if (fullName) params['fullName'] = fullName
    if (nickName) params['nickName'] = nickName

    const creator = await this.creatorModel.findOne(params).populate({path: 'photo', select: '_id folderName folderPath originalImgPath compressedImgPath'}).exec()

    if (!creator) throw new NotFoundException()

    return creator
  }

  async findOneById(id: string) :Promise<CreatorDocument> {
    return this.creatorModel.findById(id).populate({path: 'photo', select: '_id folderName folderPath originalImgPath compressedImgPath'}).exec();
  }

  async update(id: string, updateCreatorDto: UpdateCreatorDto) {
    if (updateCreatorDto.nickName) {
      const creator = await this.creatorModel.findOne({nickName: updateCreatorDto.nickName})
      if (creator) throw new BadRequestException('Nickname must be unique')
    }

    return this.creatorModel.findByIdAndUpdate(id, updateCreatorDto, { new: true }).exec();
  }

  async remove(id: string):Promise<CreatorDocument> {
    const creator = await this.creatorModel.findById(id).exec()

    if (!creator) throw new NotFoundException('Creator Not Found')

    await this.filesService.removeImage({id: creator.photo})

    return creator.deleteOne()
  }
}
