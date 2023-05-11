import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as paginate from "mongoose-paginate-v2";

export type PostDocument = Post & Document;
@Schema({timestamps:true})
export class Post {
	@Prop({ unique: true })
	title: string;

	@Prop()
	titleUrl: string;

	@Prop()
	description: string;

	@Prop({ ref: 'Image' })
	mainImg: string;

	@Prop({ ref: 'BlogCategory' })
	category: string;

	@Prop({ ref: 'Creator', default: null })
	creator: string

	@Prop()
	content: string;

	@Prop({ ref: 'Post', default: []})
	readAlso: [string];

	@Prop({default: 0})
	viewsCount: number;

}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.plugin(paginate)