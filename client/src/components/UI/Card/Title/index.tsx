import {FC} from 'react';
import styles from './card-title.module.scss'
import {ICardTitle} from "@/core/types";
const CardTitle:FC<ICardTitle> = ({children}) => {

	return (
		<h3 className={styles.cardTitle}>
			{children}
		</h3>
	);
};

export default CardTitle;