import {Transform, TransformFnParams} from "class-transformer";
import {IsEmail, Length, MinLength} from "class-validator";

export class CreateUserDto {

	@IsEmail()
	@MinLength(6)
	email: string;


	@MinLength(6)
	@Transform(({ value }: TransformFnParams) => value?.trim())
	username: string;


	@Length(3, 50)
	@Transform(({ value }: TransformFnParams) => value?.trim())
	password: string;
	refreshToken?: string;
}