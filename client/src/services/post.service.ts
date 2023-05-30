import {AxiosResponse} from "axios";
import {$public_api, $private_api, $public_api_from_server} from "@/core/api";
import {IPaginationParams, IPostData, IPostFormData, IPostsLoadParams, IPostLoadParam} from "@/core/types";

export default class PostService {
	static async getALl({categoryId, creatorId, page, limit, fromServer=false}:IPostsLoadParams): Promise<AxiosResponse<IPaginationParams<IPostData[]>>> {
		const reqUrl = '/posts/query/all/?'
		let params = ''

		if (categoryId) params += '&categoryId='+categoryId
		if (creatorId) params += '&creatorId='+creatorId
		if (page) params += '&page='+page
		if (limit) params += '&limit='+limit

		if (fromServer) return $public_api_from_server.get<IPaginationParams<IPostData[]>>(reqUrl+params)

		return $public_api.get<IPaginationParams<IPostData[]>>(reqUrl+params)
	}

	static async getOne({titleUrl, categoryId, creatorId,  fromServer=false}:IPostLoadParam): Promise<AxiosResponse<IPostData>> {
		const reqUrl = '/posts/query/one/?'
		let params = ''

		if (titleUrl) params += `&titleUrl=${titleUrl}`
		if (categoryId) params += '&categoryId='+categoryId
		if (creatorId) params += '&creatorId='+creatorId

		if (fromServer) return $public_api_from_server.get<IPostData>(reqUrl+params)

		return $public_api.get<IPostData>(reqUrl+params)
	}

	static async getOneById(id:string) {
		return $public_api_from_server.get<IPostData>(`/posts/${id}`)
	}

	static async getAllForReadAlso() {
		return $public_api_from_server.get<IPostData>(`/posts/read-also`)
	}

	static async create(data: IPostFormData): Promise<AxiosResponse<IPostData>> {
		return $private_api.post<IPostData>('posts/', {...data})
	}

	static async remove(id: string): Promise<void> {
		return $private_api.delete(`posts/${id}`)
	}

	static async update(data: IPostFormData, id:string): Promise<void> {
		return $private_api.patch(`posts/${id}`, data)
	}

}