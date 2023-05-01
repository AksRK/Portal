import {IsNotEmpty, IsString, MinLength} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";


export class CreateCreatorDto {
	@IsString()
	@MinLength(6)
	fullName: string;

	@IsString()
	@MinLength(6)
	@Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase().replaceAll(' ', '-'))
	nickName: string;

	@IsString()
	@IsNotEmpty()
	photo: string;

	@IsString()
	@MinLength(6)
	description: string;

	@IsString()
	@MinLength(6)
	fieldOfActivity: string;

	@IsString()
	@MinLength(6)
	about: string;

	posts?: [string]
}
