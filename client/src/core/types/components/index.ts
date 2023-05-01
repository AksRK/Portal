import React, {ReactNode} from "react";

export * from './Admin'
export * from './Layout'
export * from './UI'

import {ICategoryBlogData} from "@/core/types";

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