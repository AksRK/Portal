import {ICategoryBlogData, ICreatorData, IPaginationParams, IPostData } from "@/core/types";
export * from './admin'

export interface ICategoryPageProps {
	postsWithPagination?: IPostsResWithPagination;
	creatorsWithPagination?: ICreatorsResWithPagination;
	categories: ICategoryBlogData[];
}

export interface ICreatorPageProps {
	creator: ICreatorData;
	postsWithPagination: IPostsResWithPagination;
	categories: ICategoryBlogData[];
}
export interface IPostPageProps {
	post: IPostData;
}

export interface IPostsResWithPagination extends IPaginationParams<IPostData[]> {}
export interface ICreatorsResWithPagination extends IPaginationParams<ICreatorData[]> {}
export interface IHomePageProps {
	postsWithPagination: IPostsResWithPagination;
	categories: ICategoryBlogData[];
}