import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from "mongoose-paginate-v2";

export type CreatorDocument = Creator & Document;

@Schema({timestamps:true})
export class Creator {

	@Prop()
	fullName: string;

	@Prop({ unique: true })
	nickName: string;

	@Prop({ ref: 'Image' })
	photo: string;

	@Prop()
	description: string;

	@Prop()
	fieldOfActivity: string;

	@Prop()
	about: string;

	@Prop()
	posts: [string]

}

export const CreatorSchema = SchemaFactory.createForClass(Creator);
CreatorSchema.plugin(paginate)