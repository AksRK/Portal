import axios from "axios";
import {AuthResponse} from "@/models/response/auth.response";
import {setCookie} from "cookies-next";

export const API_URL = 'http://127.0.0.1:4444'

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return config
})

$api.interceptors.response.use((config) => {
	return config;
},async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh/`, {withCredentials: true})
			localStorage.setItem('accessToken', response.data.accessToken);
			setCookie('refreshToken', response.data.refreshToken );
			return $api.request(originalRequest);
		} catch (e) {
			console.log('НЕ АВТОРИЗОВАН')
		}
	}
	throw error;
})
export default $api