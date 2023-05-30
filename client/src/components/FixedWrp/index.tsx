import { forwardRef } from 'react';
import styles from './fixed-wrp.module.scss'
import {IFixedWrpProps} from "@/core/types";
import {FIXED_WRP_MARGIN} from "@/core/constants";

const FixedWrp = forwardRef<HTMLDivElement, IFixedWrpProps>((
	{
		children,
		position,
		height,
		isVisible}
	,ref) => {
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
		}else {
			return ''
		}
	}

	return (
		<>
			<div ref={ref} className={styles.fixedWrp+' '+ wrpVariant() + ' ' + visible()}>
				{children}
			</div>
			{
				position === 'footer'
					?
					<div style={{height: height+FIXED_WRP_MARGIN+'px'}}></div>
					:
					''
			}

		</>

	);
});

export default FixedWrp;