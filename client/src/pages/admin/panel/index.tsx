import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "@/pages/_app";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {IUser} from "@/models/IUser";
import UserService from "@/services/user.service";

const Panel: any = () => {
	const [users, setUsers] = useState<IUser[]>([])
	const router = useRouter()
	const {store} = useContext(Context)
	const adminPanelLogin = '/admin/signin'

	const logout = ()=> {
		store.logout()
		router.push(adminPanelLogin)
	}

	const getUsers = async () => {
		const response = await UserService.fetchUsers()
		setUsers(response.data)
		console.log(users)
	}

	if (store.isLoading) {
		return <div>Loading..</div>
	}


	if (store.isAuth) {
		return (
			<div>
				Admin Panel
				<button onClick={logout}>
					выход
				</button>
				<hr/>
				<button onClick={getUsers}>
					получить юзверей
				</button>
			</div>
		);
	}
};

export default observer(Panel);