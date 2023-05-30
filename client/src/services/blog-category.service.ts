import {AxiosResponse} from "axios";
import {ICategoryFormData, ICategoryBlogData, ICategoryFindParams, IFromServer} from "@/core/types";
import {$private_api, $public_api, $public_api_from_server} from "@/core/api";

export default class BlogCategoryService {
	static async getALl({fromServer=false} : IFromServer): Promise<AxiosResponse<ICategoryBlogData[]>> {
		const reqUrl = 'blog/category'

		if (fromServer) return $public_api_from_server.get<ICategoryBlogData[]>(reqUrl)

		return $public_api.get<ICategoryBlogData[]>(reqUrl)
	}
	static async getOne({id, title, titleUrl, fromServer=false}: ICategoryFindParams): Promise<AxiosResponse<ICategoryBlogData>> {
		const reqUrl = 'blog/category/query/one/?'
		let params = ''

		if (id) params += `&id=${id}`
		if (title) params += `&title=${title}`
		if (titleUrl) params += `&titleUrl=${titleUrl}`

		if (fromServer) return $public_api_from_server.get<ICategoryBlogData>(reqUrl+params)

		return $public_api.get<ICategoryBlogData>(reqUrl+params)
	}

	static async create(data:ICategoryFormData): Promise<AxiosResponse<ICategoryBlogData>> {
		return $private_api.post<ICategoryBlogData>('blog/category', {...data})
	}

	static async remove(id: string): Promise<void> {
		return $private_api.delete(`blog/category/${id}`)
	}

	static async update(id: string, title: string): Promise<void> {
		return $private_api.patch(`blog/category/${id}`, title)
	}

}