import {FC} from 'react';
import styles from './modal-content.module.scss'
import {ModalContentProps} from "@/core/types";

const ModalContent:FC<ModalContentProps> = ({children}) => {
	return (
		<div className={styles.modalContent}>
			{children}
		</div>
	);
};

export default ModalContent;