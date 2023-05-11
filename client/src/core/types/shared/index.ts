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
	description: string;
	titleUrl: string;
	mainImg: IImageData;
	category: {
		_id: string,
		title: string,
		titleUrl: string,
		editable: boolean
	};
	creator: null | {
		_id: string,
		nickName: string,
		fullName: string
	};
	content: string;
	readAlso : [IPostData]
	viewsCount: number;
	createdAt: string;
	updatedAt: string
}

export interface ICreatorData {
	_id: string;
	fullName: string;
	nickName: string;
	photo: IImageData;
	description: string;
	fieldOfActivity: string;
	about: string
	posts: [string]
}

export interface CreatorFormData {
	fullName: string;
	nickName: string;
	photo: string;
	description: string;
	fieldOfActivity: string;
	about: string
}

export interface PostFormData {
	title: string;
	description: string;
	mainImg: string
	category: string;
	creator?: string | null;
	content: string;
	readAlso: string[]
	viewsCount: number;
	about: string
}

export interface IImageData {
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