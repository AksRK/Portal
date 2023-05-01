import React, { forwardRef } from 'react';
import styles from './fixed-wrp.module.scss'
import {FixedWrpProps} from "@/core/types";

const FixedWrp = forwardRef<HTMLDivElement, FixedWrpProps>((
	{
		children,
		position,
		height,
		isVisible}
	,ref) => {
	const margin = 50
	const wrpVariant = () => {
		if (position === 'header') {
			return styles.fixedWrp_header
		}
		if (position === 'footer') {
			return styles.fixedWrp_footer
		}
	}

	const visible = () => {
		if (!isVisible) {
			return styles.fixedWrp_overflow
		}
	}

	return (
		<>
			<div ref={ref} className={styles.fixedWrp+' '+ wrpVariant() + ' ' + visible()}>
				{children}
			</div>
			<div style={{height: height+margin+'px'}}></div>
		</>

	);
});

export default FixedWrp;