import React, {FC} from 'react';
import {RouteProviderProps} from "@/core/types";
import {useRouter} from "next/router";
import {AdminLayout, AppLayout} from "@/components/Layout";
import {ToastContainer} from "react-toastify";

const RouteProvider:FC<RouteProviderProps> = ({children}) => {
	const router = useRouter()

	if (router.asPath.includes('/admin')) {
		return (
			<>
				<AppLayout contentAnimate={false}>
					{
						!router.asPath.includes('signin')
							?
							<AdminLayout>
								{children}
							</AdminLayout>
							:
							<>
								{children}
							</>
					}
					<ToastContainer/>
				</AppLayout>
			</>
		)
	}

	return (
		<>
			<AppLayout contentAnimate={true}>
				{children}
			</AppLayout>
		</>
	);
};

export default RouteProvider;