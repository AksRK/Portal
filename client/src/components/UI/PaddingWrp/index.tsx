import {FC} from 'react';
import styles from './padding-wrp.module.scss'
import {IPaddingWrp} from "@/core/types";
const PaddingWrp:FC<IPaddingWrp> = ({children, size}) => {

	const setClassName = () => {
		switch (size) {
			case 'small':
				return styles.paddingWrp_small
			case 'large':
				return styles.paddingWrp_large
			default:
				return styles.paddingWrp_small
		}
	}

	return (
		<div className={setClassName()}>
			{children}
		</div>
	);
};

export default PaddingWrp;