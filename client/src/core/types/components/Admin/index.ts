import {ICategoryBlogData} from "@/core/types/shared";

export interface ICategoryTableProps {
	categories: ICategoryBlogData[];
	onDelete: (id: string) => Promise<void>;
	onUpdate: (id: string, title: string) => Promise<void>;
	getOne: (id: string) => Promise<{data: ICategoryBlogData | null}>;
}

export interface BasicMenuProps {
	onEdit: () => void;
	onDelete: () => void;
}