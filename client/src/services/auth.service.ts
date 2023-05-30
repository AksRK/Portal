import {AxiosResponse} from "axios";
import {$private_api} from "@/core/api";
import {IAuthResponse, ISignInFormDataProps} from "@/core/types";

export default class AuthService {
	static async signin({email, password}: ISignInFormDataProps): Promise<AxiosResponse<IAuthResponse>> {
		return $private_api.post<IAuthResponse>('auth/signin', { email, password })
	}

	static async signup(email: string, password: string, username: string): Promise<AxiosResponse<IAuthResponse>> {
		return $private_api.post<IAuthResponse>('auth/signup', { email, password, username })
	}

	static async logout(): Promise<AxiosResponse<void>> {
		return $private_api.get('auth/logout')
	}

	static async checkAuth(): Promise<AxiosResponse<void>> {
		return $private_api.get('auth/check')
	}
}