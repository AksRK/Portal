import styles from './page-body.module.scss'
import { forwardRef, useState} from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import {ContentBodyProps} from "@/core/types";


const Content = forwardRef<HTMLDivElement, ContentBodyProps>(({height,children, animate}, ref) => {
	const [scrollY, setScrollY] = useState<number>(0)
	const { scrollYProgress } = useScroll()
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setScrollY(latest)
	})
	const setWidth = () => {
		if (animate) {
			if (scrollY > 0.2 && scrollY < 0.98) {
				return {maxWidth: '100%'}
			}

		}
		if (!animate) {
			return {margin: '50px auto'}
		}
	}

	return (
		<div  className={styles.pageBody} style={setWidth()} >
			<div ref={ref} className={styles.pageBody__mark}></div>
			{children}
		</div>
	);
});
export default Content;