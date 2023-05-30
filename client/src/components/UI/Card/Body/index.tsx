import {FC, useEffect} from 'react';
import styles from './card-body.module.scss'
import {ICardBody} from "@/core/types";
import {motion} from "framer-motion";
import useWindowSize from "@/core/hooks/UseWindowSize";

const CardBody:FC<ICardBody> = ({children, setHoverState, hoverState =false}) => {
	const {width} = useWindowSize()
	const staticHoverBreakpoint  = 600

	const hoverStart = () => {
		if (width && width >= staticHoverBreakpoint) {
			setHoverState(true)
		}
	}

	const hoverEnd = () => {
		if (width && width >= staticHoverBreakpoint) {
			setHoverState(false)
		}
	}

	useEffect(()=> {
		if (width && width <= staticHoverBreakpoint) {
			setHoverState(true)
		}else {
			setHoverState(false)
		}
	}, [width])

	return (
		<motion.div
			className={`${styles.cardBody} ${hoverState?styles.cardBody_hover:''}`}
			onHoverStart={hoverStart}
			onHoverEnd={hoverEnd}>
			{children}
		</motion.div>
	);
};

export default CardBody;