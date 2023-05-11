import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, PaginateModel, PaginateResult } from 'mongoose';
import {Post, PostDocument} from "./schemas/post.schema";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Utils} from "../common/utils/utils";
import {BlogCategoryService} from "../blog-category/blog-category.service";
import {CreatorsService} from "../creators/creators.service";

@Injectable()
export class PostsService {
  constructor(
      @InjectModel(Post.name) private PostModel: Model<PostDocument>,
      @InjectModel(Post.name) private PostModelPaginate: PaginateModel<PostDocument>,
      private blogCategoryService: BlogCategoryService,
      private creatorsService: CreatorsService
  ) {}

  async removePostFromCategory(categoryId: string, postId :string) {
    const category =  await this.blogCategoryService.findById(categoryId)
    const categoryPostIndex = category.posts.indexOf(postId)
    category.posts.splice(categoryPostIndex, 1)
    await category.save()
  }
  async addPostToCategory(categoryId: string, postId :string) {
    const category = await this.blogCategoryService.findById(categoryId)
    if (!category.posts.some((post) => post === postId)) {
      category.posts.push(postId)
      await category.save()
    }
  }

  async removePostFromCreator(creatorId: string, postId :string) {
    const creator =  await this.creatorsService.findOneById(creatorId)
    const creatorPostIndex = creator.posts.indexOf(postId)
    creator.posts.splice(creatorPostIndex, 1)
    await creator.save()
  }

  async addPostToCreator(creatorId: string, postId :string) {
    const creator =  await this.creatorsService.findOneById(creatorId)
    if (!creator.posts.some((post) => post === postId)) {
      creator.posts.push(postId)
      await creator.save()
    }
  }

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    const postExists = await this.findByTitle(
        createPostDto.title,
    );
    if (postExists) {
      throw new BadRequestException('Post title duplicate');
    }
    const titleUrlTransliterate = Utils.transliterateText(createPostDto.title)

    const createdPost = new this.PostModel({
      ...createPostDto,
      titleUrl: titleUrlTransliterate,
    });
    await createdPost.save()

    await this.addPostToCategory(createPostDto.category, createdPost._id)

    if (createPostDto.creator) {
      await this.addPostToCreator(createPostDto.creator, createdPost._id)
    }

    return createdPost;
  }

  async findAll(): Promise<PostDocument[]> {
    return this.PostModel
        .find()
        .populate({path:'category', select: '_id title titleUrl editable'})
        .populate({path:'creator', select: '_id nickName'})
        .exec();
  }

  async findById(id: string): Promise<PostDocument> {
    return this.PostModel
        .findById(id)
        .populate({path:'mainImg', select: '_id folderName folderPath originalImgPath compressedImgPath'})
        .populate({path:'category', select: '_id title titleUrl editable'})
        .populate({path:'readAlso',select:'_id title'})
        .populate({path:'creator', select: '_id nickName fullName'});
  }
  async findByTitle(title: string): Promise<PostDocument> {
    return await this.PostModel.findOne({ title }).exec()
  }

  async findAllByTitle(title: string): Promise<PostDocument[]> {
    return this.PostModel.find({title: {'$regex': title, '$options': 'i'}})
  }

  async findAllForAdmin():  Promise<PostDocument[]> {
    return await this.PostModel.find().select('_id title').exec()
  }

  async findAllByQuery(
      categoryId: string,
      creatorId: string,
      page: string,
      limit: string,
      title: string): Promise<PaginateResult<PostDocument>>  {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: [
        {path:'category', select: '_id title titleUrl editable'},
        {path:'creator', select: '_id nickName'}
      ]
    }
    const query = {};

    if (categoryId) {
      query['category'] = categoryId;
    }
    if (creatorId) {
      query['creator'] = creatorId;
    }

    return this.PostModelPaginate.paginate(query, options)
  }
  async findOneByQuery(categoryId?: string, titleUrl?: string, creatorId?: string): Promise<PostDocument> {
    const query = {}
    if (categoryId) {
      query['category'] = categoryId
    }
    if (titleUrl) {
      query['titleUrl'] = titleUrl
    }
    if (creatorId) {
      query['creator'] = creatorId;
    }

    if ((Object.keys(query).length == 0)) {
      throw new BadRequestException('Cannot find post')
    }

    const post = await this.PostModel.findOne(query).exec();

    if (!post) {
      throw new NotFoundException(`Post ${titleUrl} not found`)
    }
    post.viewsCount += 1
    await post.save()

    return post
  }

  async update(
      id: string,
      updatePostDto: UpdatePostDto
  ): Promise<PostDocument> {

    const post = await this.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const category = await this.blogCategoryService.findById(updatePostDto.category)
    if (!category.editable && !updatePostDto.creator) {
      throw new BadRequestException(`Невозможно обновить пост, не указан креатор`);
    }

    if (post.category !== category._id) {
      await this.removePostFromCategory(post.category, post._id)
      await this.addPostToCategory(category._id, post._id)

    }

    if (post.creator && !updatePostDto.creator || post.creator !== updatePostDto.creator) {
      if (post.creator) {
        await this.removePostFromCreator(post.creator, post._id)
      }

      if (updatePostDto.creator) {
        await this.addPostToCreator(updatePostDto.creator, post._id)
      }
    }

    const titleUrlTransliterate = Utils.transliterateText(updatePostDto.title)
    return this.PostModel
        .findByIdAndUpdate(id, {...updatePostDto, titleUrl:titleUrlTransliterate}, { new: true })
        .exec();
  }

  async remove(id: string): Promise<PostDocument> {
    const post = await this.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    await this.removePostFromCategory(post.category, post._id)

    if (post.creator) {
      await this.removePostFromCreator(post.creator, post._id)
    }
    return this.PostModel.findByIdAndDelete(id).exec();
  }

  async removeAllFromCategory(posts: [string]) {
    posts.map(async (postId) => await this.PostModel.findByIdAndDelete(postId))
  }
}