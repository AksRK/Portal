import {AxiosResponse} from "axios";
import $api from "@/core/api";
import {AuthResponse, SignInFormDataProps} from "@/core/types";

export default class AuthService {
	static async signin({email, password}: SignInFormDataProps): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('auth/signin', { email, password })
	}

	static async signup(email: string, password: string, username: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('auth/signup', { email, password, username })
	}

	static async logout(): Promise<AxiosResponse<void>> {
		return $api.get('auth/logout')
	}

	static async checkAuth(): Promise<AxiosResponse<void>> {
		return $api.get('auth/check')
	}
}