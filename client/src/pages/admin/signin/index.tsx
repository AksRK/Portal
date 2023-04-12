import React, {FC, useContext, useState} from 'react';
import {Context} from "@/pages/_app";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";

const SignIn: any = () => {
	const router = useRouter()
	const [email, setEmail] = useState<string>('test@test.is')
	const [password, setPassword] = useState<string>('123456')
	const {store} = useContext(Context)
	const adminPanelUrl = '/admin/panel'


	if (store.isAuth) {
		router.push(adminPanelUrl)
	}else {
		return (
			<div>
				Login
				<input type="text" value={email} onChange={(event)=> setEmail(event.target.value)}/>
				<input type="text" value={password} onChange={(event)=> setPassword(event.target.value)}/>
				<button onClick={()=> store.signin(email, password)}>
					123
				</button>
			</div>
		);
	}


};

export default observer(SignIn);