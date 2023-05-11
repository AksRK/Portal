import React, {Dispatch, ReactNode, SetStateAction} from "react";

export * from './Admin'
export * from './Layout'
export * from './UI'

import {ICategoryBlogData, IImageData} from "@/core/types";

export interface CategoryNavProps {
	categories: [ICategoryBlogData]
}

export interface StoreProviderProps {
	children: ReactNode;
}

export interface RouteProviderProps {
	children: ReactNode;
}

export interface FixedWrpProps {
	children: React.ReactNode;
	position: 'header' | 'footer';
	height: number,
	isVisible: boolean
}

export interface EditorProps {
	initialContent?: string;
	name?: string;
	onChange?: (content: string) => void;
	props?: any;
}

export type FullSizeImageModalProps = {
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
	imgUrl?: string;
	imageId?: string
	// callback?: () => void;
};

export type InputImageProps = {
	imageData: IImageData | null;
	setImageData: (data: IImageData | null) => void;
};