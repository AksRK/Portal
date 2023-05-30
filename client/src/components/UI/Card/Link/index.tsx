import {FC} from 'react';
import Link from "next/link";
import {ICardLink} from "@/core/types";
import styles from './card-link.module.scss';

const CardLink:FC<ICardLink> = ({href, children}) => {
	return (
		<Link href={href} className={styles.cardLink}>
			{children}
		</Link>
	);
};

export default CardLink;