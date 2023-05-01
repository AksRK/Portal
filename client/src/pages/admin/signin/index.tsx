import React, {FC, useContext, useEffect} from 'react';
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";
import {Context} from "@/components/StoreProvider";
import {useForm} from "react-hook-form";
import {SignInFormDataProps} from "@/core/types/shared";

const SignIn: FC = () => {
	const router = useRouter()
	const {store} = useContext(Context)
	const adminPanelUrl = '/admin/panel'
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({defaultValues: {
			'email': 'test@test.is',
			'password': '123456'
		}});

	const signin = (data: SignInFormDataProps) => {
		return store.authStore.signin(data)
	}

	useEffect(()=> {
		if (localStorage.getItem('accessToken') && store.authStore.isAuth) {
			router.push(adminPanelUrl)
		}
	},[store.authStore.isAuth])


	if (store.authStore.isAuth && localStorage.getItem('accessToken')) {
		return <></>
	}
	return (
		<form onSubmit={handleSubmit(signin)}>
			<input type="text" {...register("email", {required: true, maxLength: 80})}/>
			<input type="text" {...register("password", {required: true, maxLength: 80})}/>
			<input type="submit" value={'Отправить'}/>
		</form>
	);

};

export default observer(SignIn);