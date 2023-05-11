import {AxiosResponse} from "axios";
import $api from "@/core/api";
import { PaginationParams, IPostData, PostFormData} from "@/core/types";

export default class PostService {
	static async getALl(categoryId?: string, creatorId?: string, page?: string, limit?: string): Promise<AxiosResponse<PaginationParams<IPostData[]>>> {
		let params = ''

		if (categoryId) {
			params += '&categoryId='+categoryId
		}
		if (creatorId) {
			params += '&creatorId='+creatorId
		}
		if (page) {
			params += '&page='+page
		}
		if (limit) {
			params += '&limit='+limit
		}

		return $api.get<PaginationParams<IPostData[]>>('posts/query/all/?'+params)
	}

	static async getAllByTitle (title: string) : Promise<AxiosResponse<IPostData[]>> {
		return $api.get(`posts/title/all/${title}`)
	}

	static async create(data: PostFormData): Promise<AxiosResponse<IPostData>> {
		return $api.post<IPostData>('posts/', {...data})
	}

	static async remove(id: string): Promise<void> {
		return $api.delete(`posts/${id}`)
	}

	static async update(data: PostFormData, id:string): Promise<void> {
		return $api.patch(`posts/${id}`, data)
	}

}