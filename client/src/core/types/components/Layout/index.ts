import {ReactNode} from "react";

export interface AppLayoutProps {
	children?: ReactNode;
	contentAnimate?: boolean;
}

export interface AdminLayoutProps {
	children: ReactNode;
}