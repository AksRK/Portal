import {FC} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {ActiveLinkStyleProps} from "@/core/types";

const NavLink:FC<ActiveLinkStyleProps> = (
	{
		children,
		url,
		index= false,
		className,
		activeClassName
	}) => {
	const router = useRouter()

	function AddActiveClassName() {
		if (router.asPath === '/' && index) {
			return ' ' + activeClassName
		}
		if (router.asPath?.includes(url) && !index) {
			return ' ' + activeClassName
		}else {
			return ''
		}
	}

	return (
		<Link href={url} className={className + AddActiveClassName()}>
			{children}
		</Link>
	);
};

export default NavLink;