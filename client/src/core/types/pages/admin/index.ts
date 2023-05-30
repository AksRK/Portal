import {ICategoryBlogData, ICreatorData, IPostData} from "@/core/types";

export interface IUpdateCreatorPageProps {
	creator: ICreatorData;
}

export interface IUpdatePostPageProps {
	post: IPostData;
	categories: ICategoryBlogData[];
	readAlsoPosts: IPostData[];
	creators: ICreatorData[];
}

export interface ICreatePostPageProps {
	categories: ICategoryBlogData[];
	readAlsoPosts: IPostData[];
	creators: ICreatorData[];
}

export interface IAdminPostsProps {
	categories: ICategoryBlogData[];
	creators: ICreatorData[];
}