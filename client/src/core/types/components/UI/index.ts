import {ReactNode, RefObject} from "react";

export interface ContentBodyProps {
	height: 'auto' | 'full';
	children: ReactNode;
	animate: boolean;
}

export interface LogoProps {
	variant: 'header' | 'footer'
}

export interface ModalContentProps {
	children?: ReactNode
}

export interface ActiveLinkStyleProps {
	url: string;
	index?: boolean;
	className?: string
	activeClassName?: string;
	children?: ReactNode
}

export interface shrinkTextProps {
	text: string;
	wrapperRef: RefObject<HTMLElement>
}