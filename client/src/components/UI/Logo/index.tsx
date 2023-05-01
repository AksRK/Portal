import React, {FC} from 'react';
import styles from './logo.module.scss'
import Link from "next/link";
import {LogoProps} from "@/core/types";

const Logo:FC<LogoProps> = ({variant}) => {
	return (
		<Link href={'/'} className={styles.logo}>
			<img src="" alt="logo"/>
		</Link>
	);
};

export default Logo;