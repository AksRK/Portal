import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import {BlogCategory, BlogCategoryDocument} from "./schemas/blog-category.schema";
import {Utils} from "../common/utils/utils";
import {PostsService} from "../posts/posts.service";



@Injectable()
export class BlogCategoryService {
	constructor(
		@InjectModel(BlogCategory.name)
		private readonly blogCategoryModel: Model<BlogCategoryDocument>,
		@Inject(forwardRef(() => PostsService))
		private readonly postsService: PostsService,
	) {}

	async create(
		createBlogCategoryDto: CreateBlogCategoryDto,
	): Promise<BlogCategoryDocument> {
		const blogCategoryExists = await this.findByTitle(
			createBlogCategoryDto.title,
		);
		if (blogCategoryExists) {
			throw new BadRequestException('Blog Index duplicate');
		}
		const titleUrlTransliterate = Utils.transliterateText(createBlogCategoryDto.title)
		const createdBlogCategory = new this.blogCategoryModel({
			...createBlogCategoryDto,
			titleUrl:titleUrlTransliterate
		});

		return  createdBlogCategory.save();
	}

	async findAll(): Promise<BlogCategoryDocument[]> {
		return this.blogCategoryModel.find().sort({createdAt: 1, editable: -1}).exec();
	}

	async findAllForAdmin(): Promise<BlogCategoryDocument[]> {
		return this.blogCategoryModel.find().select('_id title titleUrl editable');
	}

	async findOneByQuery(id: string, title: string, titleUrl: string) {
		const params = {}

		if (!id && !title && !titleUrl) throw new NotFoundException()

		if (id) params['_id'] = id
		if (title) params['title'] = title
		if (titleUrl) params['titleUrl'] = titleUrl

		const category = await this.blogCategoryModel.findOne(params)

		if (!category) throw new NotFoundException()

		return category
	}

	async findById(id: string): Promise<BlogCategoryDocument> {
		return this.blogCategoryModel.findById(id).exec();
	}

	async findByTitle(title: string): Promise<BlogCategoryDocument> {
		return this.blogCategoryModel.findOne({title: title}).exec();
	}

	async update(
		id: string,
		updateBlogCategoryDto: UpdateBlogCategoryDto,
	): Promise<BlogCategoryDocument> {
		const blogCategoryExists = await this.findById(
			id,
		);
		if (!blogCategoryExists) throw new NotFoundException('Blog Index Not Found');

		const titleUrlTransliterate = Utils.transliterateText(updateBlogCategoryDto.title)

		const blogCategoryUniqueUrl = await this.blogCategoryModel.findOne({titleUrl: titleUrlTransliterate})

		if (blogCategoryUniqueUrl) throw new BadRequestException('Category must have unique Title & Url')

		return this.blogCategoryModel
			.findByIdAndUpdate(id, {...updateBlogCategoryDto, titleUrl: titleUrlTransliterate}, { new: true })
			.exec();
	}
	async remove(id: string): Promise<BlogCategoryDocument> {
		const blogCategory = await this.findById(
			id,
		);
		if (!blogCategory) {
			throw new NotFoundException('Blog Index Not Found');
		}
		if (!blogCategory.editable) {
			throw new BadRequestException('This category cannot be deleted')
		}
		if (blogCategory.posts.length > 0) {
			await this.postsService.removeAllFromCategory(blogCategory.posts)
		}
		return this.blogCategoryModel.findByIdAndDelete(id).exec();
	}
}