import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import {Creator, CreatorDocument} from "./schemas/creator.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class CreatorsService {
  constructor(@InjectModel(Creator.name) private creatorModel: Model<CreatorDocument>) {}
  async create(createCreatorDto: CreateCreatorDto) {
    const creatorExist = await this.creatorModel.findOne({nickName: createCreatorDto.nickName})
    if (creatorExist) {
      throw new BadRequestException('Creator already exists');
    }
    const newCreator = await this.creatorModel.create(createCreatorDto)

    return newCreator.save()
  }

  async findAll() {
    return this.creatorModel.find().exec()
  }

  async findOneById(id: string) :Promise<CreatorDocument> {
    return this.creatorModel.findById(id).exec();
  }

  async findOneByNickName(nickName: string) :Promise<CreatorDocument> {
    const creator = await this.creatorModel.findOne({nickName: nickName}).exec();
    if (!creator) {
      throw new NotFoundException(`Creator ${nickName} not found`)
    }
    return creator
  }

  async update(id: string, updateCreatorDto: UpdateCreatorDto) {
    console.log(updateCreatorDto)
    return this.creatorModel.findByIdAndUpdate(id, updateCreatorDto, { new: true }).exec();
  }

  async remove(id: string):Promise<CreatorDocument> {
    return this.creatorModel.findByIdAndDelete(id).exec();
  }
}
