import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type FileDocument = File & Document;
@Schema({timestamps:true})
export class File {
	@Prop()
	folderName: string;
	@Prop()
	folderPath: string;
	@Prop()
	originalImgPath: string;
	@Prop()
	compressedImgPath: string;
}
export const FileSchema = SchemaFactory.createForClass(File);