import {makeAutoObservable} from "mobx";
import AuthService from "@/services/auth.service";
import { setCookie} from "cookies-next";

export default class Store {
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

	async signin(email: string, password: string) {
		try {
			const response = await AuthService.signin(email, password)
			localStorage.setItem('accessToken', response.data.accessToken)
			setCookie('refreshToken', response.data.refreshToken );
			this.setAuth(true)
			console.log(response.data)
		}catch (e) {
			console.log(e)
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout();
			localStorage.removeItem('accessToken');
			setCookie('refreshToken', '' );
			this.setAuth(false);
		} catch (e) {
			console.log(e);
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