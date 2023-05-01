import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
// import { BlogCategory } from "../../blog-category/schemas/blog-category.schema";

export type PostDocument = Post & Document;
@Schema({timestamps:true})
export class Post {
	@Prop({ unique: true })
	title: string;

	@Prop()
	titleUrl: string;

	@Prop()
	mainImg: string;

	@Prop({ ref: 'BlogCategory' })
	category: string;

	@Prop({ ref: 'Creator', default: null })
	creator: string

	@Prop()
	content: string;

	@Prop({default: 0})
	viewsCount: number;

}

export const PostSchema = SchemaFactory.createForClass(Post);