import {FC} from 'react';
import styles from './card-description.module.scss'
import { ICardDescription} from "@/core/types";

const CardDescription:FC<ICardDescription> = ({children, lineClamp}) => {

	const getStyles = () => {
		let result = `${styles.cardDescription} `

		switch (lineClamp) {
			case 2:
				return result += ` ${styles.cardDescription_lineClamp_2}`
			case 4:
				return result += ` ${styles.cardDescription_lineClamp_4}`
		}
	}

	return (
		<div className={getStyles()}>
			{children}
		</div>
	);
};

export default CardDescription;