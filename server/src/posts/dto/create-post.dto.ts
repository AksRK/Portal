export class CreatePostDto {
	title: string;

	mainImg: string
	description: string;

	content: string

	category: string;

	creator?: string

	readAlso?: [string]

	viewsCount?: number

}