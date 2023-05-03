import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type ImageDocument = Image & Document;
@Schema({timestamps:true})
export class Image {
	@Prop()
	folderName: string;
	@Prop()
	folderPath: string;
	@Prop()
	originalImgPath: string;
	@Prop()
	compressedImgPath: string;
}
export const ImageSchema = SchemaFactory.createForClass(Image);