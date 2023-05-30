import {ReactNode} from "react";
import {ICreatorData, IPostData} from "@/core/types";
import {Interpolation, ThemeProps} from "styled-components";

export interface IContentBodyProps {
	height: 'auto' | 'full';
	fixedWrpHeight?: number;
	children: ReactNode;
	animate: boolean;

}

export interface IPaddingWrp {
	size: 'small' | 'large';
	children: ReactNode;
}

export interface ILogoProps {
	variant: 'header' | 'footer'
}

export interface IModalContentProps {
	children?: ReactNode
}

export interface IActiveLinkStyleProps {
	url: string;
	index?: boolean;
	className?: string
	activeClassName?: string;
	children?: ReactNode
}

export interface ICardBody {
	children: ReactNode;
	setHoverState: (state: boolean) => void;
	hoverState: boolean;
}
export interface ICardImage {
	imagePath: string;
	alt?: string;
}

export interface ICardTitle {
	children: string;
}

export interface ICardLink {
	children: ReactNode;
	href: string;
}

export interface ICardContent {
	children: ReactNode;
	footer?: ReactNode;
}

export interface ICardDescription {
	children: string;
	lineClamp: 2 | 4
}

export interface ICardFooter {
	children: string;
	hovered: boolean;
}

export interface IButton {
	children: ReactNode;
	disabled?: boolean;
	color?: 'black' | 'white';
	type?: 'button' | 'link' | 'next-link';
	variant?: 'default' | 'circle';
	href?: string;
	onClick?: () => void;
}

export  interface ISocialLink {
	href: string;
	color?: 'black' | 'white'
}

export interface ILoadMore {
	loadMore: boolean;
	isLoading: boolean;
	onLoadMore: ()=> void;
	buttonText?: string
}

export interface ICardsList extends ILoadMore {
	data: {
		posts?: IPostData[] | null,
		creators?: ICreatorData[] | null,
	}
	withTag: boolean;
}

export interface IFlexBox {
	children: ReactNode;
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
	alignItems?: 'flex-start' | 'flex-end' | 'center';
	customStyles?: Interpolation<ThemeProps<any>>;
	gap?: number | [number, number];
}