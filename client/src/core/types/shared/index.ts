import {SubmitHandler} from "react-hook-form";

export interface IFromServer {
	fromServer?: boolean;
}
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
	readAlso : string[];
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

export interface ICreatorFormData {
	fullName: string;
	nickName: string;
	photo: string;
	description: string;
	fieldOfActivity: string;
	about: string
}

export interface IPostFormData {
	title: string;
	description: string;
	mainImg: string;
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

export interface ISignInFormDataProps {
	email: string;
	password: string
}

export interface ICategoryFormData {
	title: string;
}
export interface ILoadMoreParams {
	page?: number;
	limit?: number;
}
export interface IPostsLoadParams extends ILoadMoreParams, IFromServer{
	categoryId?: string;
	creatorId?: string;

}

export interface IPostLoadParam extends IFromServer {
	categoryId?: string;
	creatorId?: string;
	titleUrl?: string;
}

export interface ICreatorsLoadParams extends ILoadMoreParams, IFromServer {}

export interface ICreatorsFindOneParams extends IFromServer {
	id?: string;
	fullName?: string;
	nickName?: string;
}

export interface ICategoryFindParams extends IFromServer {
	id?: string
	title?:string
	titleUrl?: string
}

export interface ICreatorForm {
	defaultCreatorValues?: ICreatorData;
	onSubmit: SubmitHandler<ICreatorFormData>;
}