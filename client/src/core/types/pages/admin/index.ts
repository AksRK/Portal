import {ICategoryBlogData, ICreatorData, IPostData} from "@/core/types";

export interface UpdateCreatorPageProps {
	creator: ICreatorData;
}

export interface UpdatePostPageProps {
	post: IPostData;
	categories: ICategoryBlogData[];
	readAlsoPosts: IPostData[];
	creators: ICreatorData[];
}

export interface CreatePostPageProps {
	categories: ICategoryBlogData[];
	readAlsoPosts: IPostData[];
	creators: ICreatorData[];
}