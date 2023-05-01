export interface ICategoryBlogData {
	_id: string;
	title: string;
	titleUrl: string;
	posts: [string];
	editable: boolean;
	createdAt: string
}

export interface IPostData {
	_id: string;
	title: string;
	titleUrl: string;
	mainImg: IFileData;
	category: string;
	creator: string | null;
	content: string;
	viewsCount: number;
	createdAt: string;
	updatedAt: string
}

export interface ICreatorData {
	_id: string;
	fullName: string;
	nickName: string;
	photo: string;
	description: string;
	fieldOfActivity: string;
	about: string
}

export interface IFileData {
	_id: string;
	folderName: string;
	folderPath: string;
	originalImgPath: string;
	compressedImgPath: string;

}

export interface SignInFormDataProps {
	email: string;
	password: string
}

export interface CategoryFormData {
	title: string;
}