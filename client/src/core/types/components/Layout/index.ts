import {ReactNode} from "react";

export interface IAppLayoutProps {
	children?: ReactNode;
	contentAnimate?: boolean;
}

export interface IAdminLayoutProps {
	children: ReactNode;
}