import {ICategoryBlogData, ICreatorData, IPostData} from "@/core/types/shared";

export interface ICategoryTableProps {
	categories: ICategoryBlogData[];
	onDelete: (id: string) => Promise<void>;
	onUpdate: (id: string, title: string) => Promise<void>;
	getOne: (id: string) => Promise<{data: ICategoryBlogData | null}>;
}

export interface ICreatorsTableProps {
	creators: ICreatorData[];
	onDelete: (id: string) => Promise<void>;
}

export interface IPostsTableProps {
	posts: IPostData[];
	onDelete: (id: string) => Promise<void>;
}

export interface BasicMenuProps {
	onEdit: () => void;
	onDelete: () => void;
}