import {ICategoryBlogData, ICreatorData, IPostData} from "@/core/types";
export * from './admin'

export interface ICategoryPageProps {
	categories: [ICategoryBlogData],
	currentCategory?: ICategoryBlogData,
	posts?: [IPostData]
	creators?: [ICreatorData]
}

export interface ICreatorPageProps {
	categories: [ICategoryBlogData];
	creator: ICreatorData,
	posts: [IPostData]
}
export interface IPostPageProps {
	post: IPostData
}

export interface IHomePageProps {
	categories: [ICategoryBlogData],
	posts: [IPostData]
}

