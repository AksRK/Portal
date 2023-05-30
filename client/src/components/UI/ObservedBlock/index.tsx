import styles from './observed-block.module.scss'
import {forwardRef} from "react";

const ObservedBlock = forwardRef<HTMLDivElement, {}>((props, ref) => {
	return (
		<div ref={ref} className={styles.observedBlock}/>
	);
});

export default ObservedBlock;