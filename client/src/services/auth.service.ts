import {AxiosResponse} from "axios";
import $api from "@/http";
import {AuthResponse} from "@/models/response/auth.response";
import {IUser} from "@/models/IUser";

export default class AuthService {
	static async signin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/signin', { email, password })
	}

	static async signup(email: string, password: string, username: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/signup', { email, password, username })
	}

	static async logout(): Promise<void> {
		return $api.get('/auth/logout')
	}

	static async checkAuth(): Promise<void> {
		return $api.get('/auth/check')
	}
}
