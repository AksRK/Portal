import {AxiosResponse} from "axios";
import $api from "@/core/api";
import {DeleteImageParams, IImageData} from "@/core/types";



export default class ImageService {
	static async upload(image: File): Promise<AxiosResponse<IImageData>> {
		const formData = new FormData();
		formData.append('image', image);
		return $api.post<any>(
			'/files/image',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
	}

	static async delete({id, folderPath}: DeleteImageParams): Promise<AxiosResponse<void>> {
		const requestParams = () => {
			if (id && folderPath) {
				return `id=${id}&folderPath=${folderPath}`
			}
			if (id) {
				return `id=${id}`
			}
			if (folderPath) {
				return `folderPath=${folderPath}`
			}
		}

		return $api.delete('/files/image/?'+requestParams())
	}

}