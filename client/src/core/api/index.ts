import axios from "axios";
import {IAuthResponse} from "@/core/types/response";
import {API_URL} from "@/core/constants";

const $public_api = axios.create({
	baseURL: '/api/'
})
const $public_api_from_server = axios.create({
	baseURL: API_URL
})
const $private_api = axios.create({
	baseURL: '/api/'
})

$private_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return config
})

$private_api.interceptors.response.use((config) => {
	return config;
},async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.get<IAuthResponse>(`/api/auth/refresh/`, {withCredentials: true, headers:{Authorization:`Bearer ${localStorage.getItem('refreshToken')}`}})
			localStorage.setItem('accessToken', response.data.accessToken);
			localStorage.setItem('refreshToken', response.data.refreshToken );
			return $private_api.request(originalRequest);
		} catch (e) {
			console.log('НЕ АВТОРИЗОВАН')
		}
	}
	throw error;
})
export {$public_api, $public_api_from_server, $private_api}