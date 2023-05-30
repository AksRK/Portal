import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreatePostDto {
	@IsString()
	@MinLength(6, {message: 'Title cannot be empty'})
	title: string;
	@IsNotEmpty({message:'Picture cannot be empty'})
	mainImg: string
	@IsString()
	@MinLength(6, {message:'Description cannot be empty'})
	description: string;
	@IsString()
	@MinLength(6, {message:'Post cannot be empty'})
	content: string
	@IsNotEmpty({message:'Category cannot be empty'})
	category: string;
	creator?: string
	readAlso?: [string]

}