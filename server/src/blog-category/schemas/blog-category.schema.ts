import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogCategoryDocument = BlogCategory & Document;

@Schema({timestamps:true})
export class BlogCategory {
	@Prop({ required: true })
	title: string;

	@Prop()
	titleUrl: string

	@Prop()
	posts: [string]

	@Prop({default: true})
	editable: boolean
}

export const BlogCategorySchema = SchemaFactory.createForClass(BlogCategory);