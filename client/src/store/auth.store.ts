import {makeAutoObservable} from "mobx";
import AuthService from "@/services/auth.service";
import {ISignInFormDataProps} from "@/core/types/shared";

export default class AuthStore {
	isAuth = false
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setLoading (bool: boolean) {
		this.isLoading = bool
	}

	async signin(data: ISignInFormDataProps) {
		this.setLoading(true)
		try {
			const response = await AuthService.signin(data)
			localStorage.setItem('accessToken', response.data.accessToken)
			localStorage.setItem('refreshToken', response.data.refreshToken)
			this.setAuth(true)
		}catch (e) {
			console.log(e)
		}finally {
			this.setLoading(false)
		}
	}

	async logout() {
		this.setLoading(true)
		try {
			const response = await AuthService.logout();
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken')
			this.setAuth(false)
		} catch (e) {
			console.log(e);
		}finally {
			this.setLoading(false)
		}
	}

	async checkAuth() {
		this.setLoading(true)
		try {
			const response = await AuthService.checkAuth();
			this.setAuth(true)
		}catch (e) {
			console.log(e)
		}finally {
			this.setLoading(false)
		}
	}
}