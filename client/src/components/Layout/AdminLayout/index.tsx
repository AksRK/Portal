import * as React from 'react';
import styles from './admin-panel.module.scss'
import {FC, ReactNode, useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";
import {Context} from "@/components/StoreProvider";
import {AdminLayoutProps} from "@/core/types";

const AdminWrp:FC<AdminLayoutProps> = ({children}) => {
	const router = useRouter()
	const {store} = useContext(Context)
	const adminPanelLogin = '/admin/signin'

	const logout = ()=> {
		store.authStore.logout()
		router.push(adminPanelLogin)
	}

	useEffect(()=> {
		if (!localStorage.getItem('accessToken') && !store.authStore.isAuth) {
			router.push(adminPanelLogin)
		}
	},[store.authStore.isAuth])

	if (!store.authStore.isAuth) {
		return <></>
	}
	return (
		<div className={styles.adminContent}>
			{children}
		</div>
	)
}

// export default observer(AdminLayout);
export const AdminLayout = observer(AdminWrp);