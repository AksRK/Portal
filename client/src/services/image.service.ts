import {AxiosResponse} from "axios";
import {IDeleteImageParams, IImageData} from "@/core/types";
import {$private_api} from "@/core/api";

export default class ImageService {
	static async upload(image: File): Promise<AxiosResponse<IImageData>> {
		const formData = new FormData();
		formData.append('image', image);
		return $private_api.post<IImageData>(
			'/files/image',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
	}
	static async delete({id, folderPath}: IDeleteImageParams): Promise<AxiosResponse<void>> {
		let params = ''
		if (id) params += `id=${id}`
		if (folderPath) params += `&folderPath=${folderPath}`

		return $private_api.delete('/files/image/?'+params)
	}

}