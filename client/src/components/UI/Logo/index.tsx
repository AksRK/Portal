import {FC} from 'react';
import styles from './logo.module.scss'
import Link from "next/link";
import {ILogoProps} from "@/core/types";

const Logo:FC<ILogoProps> = ({variant}) => {
	return (
		<Link href={'/'} className={styles.logo}>
			<img src="" alt="logo"/>
		</Link>
	);
};

export default Logo;