import {Dispatch, ReactNode, SetStateAction} from "react";

export * from './Admin'
export * from './Layout'
export * from './UI'

import {ICategoryBlogData, ICreatorData, IImageData, IPostData, IPostFormData} from "@/core/types";
import {SubmitHandler} from "react-hook-form";

export interface ICategoryNavProps {
	categories: ICategoryBlogData[];
}

export interface IStoreProviderProps {
	children: ReactNode;
}

export interface IRouteProviderProps {
	children: ReactNode;
}

export interface IFixedWrpProps {
	children: ReactNode;
	position: 'header' | 'footer';
	height: number;
	isVisible: boolean;
}

export interface IEditorProps {
	initialContent?: string;
	name?: string;
	onChange?: (content: string) => void;
	props?: any;
}

export type TFullSizeImageModalProps = {
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
	imgUrl?: string;
	imageId?: string
};

export type IInputImageProps = {
	imageData: IImageData | null;
	setImageData: (data: IImageData | null) => void;
};

export interface IPostCard {
	post: IPostData;
	withTag?: boolean;
}

export interface ICreatorCard {
	creator: ICreatorData;
}

export interface IPostsLists {
	posts: IPostData[];
	withTag?: boolean;
	loadMore: boolean
	onLoadMore: ()=> void;
	isLoading: boolean;
}

export interface IPostForm {
	categories: ICategoryBlogData[];
	readAlsoPosts: IPostData[];
	creators: ICreatorData[];
	onSubmit: SubmitHandler<IPostFormData>;
	defaultPostValues?: IPostData | null ;
}