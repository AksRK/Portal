import {FC} from 'react';
import {IRouteProviderProps} from "@/core/types";
import {useRouter} from "next/router";
import {ToastContainer} from "react-toastify";
import AppLayout from "@/components/Layout/AppLayout";
import AdminLayout from "@/components/Layout/AdminLayout";
import PaddingWrp from "@/components/UI/PaddingWrp";

const RouteProvider:FC<IRouteProviderProps> = ({children}) => {
	const router = useRouter()
	if (router.asPath.includes('/admin')) {
		return (
			<>
				<AppLayout contentAnimate={false}>
					{
						!router.asPath.includes('signin')
							?
							<AdminLayout>
								<PaddingWrp size={'small'}>
									{children}
								</PaddingWrp>
							</AdminLayout>
							:
							<>
								<PaddingWrp size={'small'}>
									{children}
								</PaddingWrp>
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