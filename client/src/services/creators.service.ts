import {AxiosResponse} from "axios";
import $api from "@/core/api";
import {CreatorFormData, ICreatorData} from "@/core/types";

export default class CreatorsService {
	static async getALl(): Promise<AxiosResponse<ICreatorData[]>> {
		return $api.get<ICreatorData[]>('creators')
	}

	static async getOneById(id: string): Promise<AxiosResponse<ICreatorData>> {
		return $api.get<ICreatorData>(`creators/${id}`)
	}

	static async getByNameOrNickName(param: string): Promise<AxiosResponse<ICreatorData[]>> {
		return $api.get<ICreatorData[]>(`creators/params/${param}`)
	}

	static async create(data: CreatorFormData): Promise<AxiosResponse<ICreatorData>> {
		return $api.post<ICreatorData>('creators', {...data})
	}

	static async remove(id: string): Promise<void> {
		return $api.delete(`creators/${id}`)
	}

	static async update(data: CreatorFormData, id:string): Promise<void> {
		return $api.patch(`creators/${id}`, data)
	}

}