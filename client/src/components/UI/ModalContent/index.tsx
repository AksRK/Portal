import {FC} from 'react';
import styles from './modal-content.module.scss'
import {IModalContentProps} from "@/core/types";

const ModalContent:FC<IModalContentProps> = ({children}) => {
	return (
		<div className={styles.modalContent}>
			{children}
		</div>
	);
};

export default ModalContent;