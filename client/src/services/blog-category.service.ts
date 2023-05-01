import {AxiosResponse} from "axios";
import $api from "@/core/api";
import {CategoryFormData, ICategoryBlogData} from "@/core/types";

export default class BlogCategoryService {
	static async getALl(): Promise<AxiosResponse<ICategoryBlogData[]>> {
		return $api.get<ICategoryBlogData[]>('blog/category')
	}

	static async getOneById(id: string): Promise<AxiosResponse<ICategoryBlogData>> {
		return $api.get<ICategoryBlogData>(`blog/category/${id}`)
	}

	static async addNew(data:CategoryFormData): Promise<AxiosResponse<ICategoryBlogData>> {
		return $api.post<ICategoryBlogData>('blog/category', {...data})
	}

	static async remove(id: string): Promise<void> {
		return $api.delete(`blog/category/${id}`)
	}

	static async update(id: string, title: string): Promise<void> {
		return $api.patch(`blog/category/${id}`, title)
	}

}