import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

	@Prop({ unique: true })
	email: string;

	@Prop()
	username: string;

	@Prop()
	password: string;

	@Prop()
	refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);