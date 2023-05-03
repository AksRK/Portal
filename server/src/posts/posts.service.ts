import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
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
      private blogCategoryService: BlogCategoryService,
      private creatorsService: CreatorsService
  ) {}

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

    const category =  await this.blogCategoryService.findById(createPostDto.category)
    category.posts.push(createdPost._id)
    await category.save()

    if (createPostDto.creator) {
      const creator = await this.creatorsService.findOneById(createPostDto.creator)
      creator.posts.push(createdPost._id)
      await creator.save()
    }

    return createdPost;
  }

  async findAll(): Promise<PostDocument[]> {
    return this.PostModel.find().exec();
  }

  async findById(id: string): Promise<PostDocument> {
    return this.PostModel.findById(id);
  }
  async findByTitle(title: string): Promise<PostDocument> {
    return await this.PostModel.findOne({ title }).populate('category').exec()
    // return await this.PostModel.findOne({ title }).exec()
  }

  async findByTitleUrl(titleUrl: string): Promise<PostDocument> {
    const post = await this.PostModel.findOne({ titleUrl }).exec()
    if (!post) {
      throw new NotFoundException(`Post ${titleUrl} not found`)
    }
    return post
  }
  async findAllByQuery(categoryId: string, creatorId: string): Promise<PostDocument[]>  {
    const query = { category: { _id: categoryId } };
    if (creatorId) {
      query['creator'] = { _id: creatorId };
    }
    const posts = await this.PostModel.find(query).exec();
    if (!posts) {
      throw new NotFoundException(`Posts not found`)
    }
    return posts
  }
  async findOneByQuery(categoryId: string, titleUrl: string, creatorId: string): Promise<PostDocument> {
    const query = { titleUrl, category: { _id: categoryId } };
    if (creatorId) {
      query['creator'] = { _id: creatorId };
    }
    const post = await this.PostModel.findOne(query).exec();
    if (!post) {
      throw new NotFoundException(`Post ${titleUrl} not found`)
    }
    post.viewsCount += 1
    await post.save()

    return post
  }

  async findByCategoryId(categoryId: string): Promise<PostDocument[]> {
    return await this.PostModel.find({category: categoryId}).exec()
  }

  async update(
      id: string,
      updatePostDto: UpdatePostDto
  ): Promise<PostDocument> {
    const postExists = await this.findById(id);
    if (!postExists) {
      throw new BadRequestException('Post not found');
    }

    if (updatePostDto.title) {
      const titleUrlTransliterate = Utils.transliterateText(updatePostDto.title)
      return this.PostModel
          .findByIdAndUpdate(id, {...updatePostDto, titleUrl:titleUrlTransliterate}, { new: true })
          .exec();
    }
    return this.PostModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .exec();
  }

  async remove(id: string): Promise<PostDocument> {
    const post = await this.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const category =  await this.blogCategoryService.findById(post.category)
    const categoryPostIndex = category.posts.indexOf(post._id)
    category.posts.splice(categoryPostIndex, 1)
    await category.save()

    if (post.creator) {
      const creator =  await this.creatorsService.findOneById(post.creator)
      const creatorPostIndex = creator.posts.indexOf(post._id)
      creator.posts.splice(creatorPostIndex, 1)
      await creator.save()
    }
    return this.PostModel.findByIdAndDelete(id).exec();
  }

  async removeAllFromCategory(posts: [string]) {
    posts.map(async (postId) => await this.PostModel.findByIdAndDelete(postId))
  }
}