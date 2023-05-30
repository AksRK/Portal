import {FC} from 'react';
import styles from './card-content.module.scss'
import {ICardContent} from "@/core/types";

const CardContent:FC<ICardContent> = ({children, footer}) => {
	return (
		<div className={styles.cardContent}>
			<div className={styles.cardContent__body}>
				{children}
			</div>
			{footer}
		</div>
	);
};

export default CardContent;