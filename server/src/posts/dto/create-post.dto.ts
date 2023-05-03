import {BlogCategory} from "../../blog-category/schemas/blog-category.schema";
import {ObjectId} from "mongoose";

export class CreatePostDto {
	title: string;

	mainImg: string

	content: string

	category: string;

	creator?: string

	viewsCount?: number

	// readAlso: ObjectId[]
}