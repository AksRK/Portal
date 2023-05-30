import {AxiosResponse} from "axios";
import {$private_api, $public_api, $public_api_from_server} from "@/core/api";
import {
	ICreatorData, ICreatorFormData,
	ICreatorsFindOneParams,
	ICreatorsLoadParams,
	IPaginationParams
} from "@/core/types";

export default class CreatorsService {
	static async getALl({page, limit, fromServer=false}:ICreatorsLoadParams): Promise<AxiosResponse<IPaginationParams<ICreatorData[]>>> {
		const reqUrl = 'creators/?'
		let params = ''
		if (page) {
			params += `&page=${page}`
		}
		if (limit) {
			params += `&limit=${limit}`
		}
		if (fromServer) {
			return $public_api_from_server.get<IPaginationParams<ICreatorData[]>>(reqUrl+params)
		}
		return $public_api.get<IPaginationParams<ICreatorData[]>>(reqUrl+params)
	}

	static async getAllForAdminList(): Promise<AxiosResponse<IPaginationParams<ICreatorData[]>>> {
		return $public_api_from_server.get<IPaginationParams<ICreatorData[]>>('creators/admin/list')
	}

	static async getOne ({id, fullName, nickName, fromServer=false}:ICreatorsFindOneParams): Promise<AxiosResponse<ICreatorData>> {
		const reqUrl = 'creators/query/one?'
		let params = ''

		if (id) params += `&id=${id}`
		if (fullName) params += `&fullName=${fullName}`
		if (nickName) params += `&nickName=${nickName}`

		if (fromServer) return $public_api_from_server.get<ICreatorData>(reqUrl+params)

		return $public_api.get<ICreatorData>(reqUrl+params)
	}

	static async create(data: ICreatorFormData): Promise<AxiosResponse<ICreatorData>> {
		return $private_api.post<ICreatorData>('creators', {...data})
	}

	static async remove(id: string): Promise<void> {
		return $private_api.delete(`creators/${id}`)
	}

	static async update(data: ICreatorFormData, id:string): Promise<void> {
		return $private_api.patch(`creators/${id}`, data)
	}

}