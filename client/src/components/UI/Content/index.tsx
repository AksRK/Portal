import styles from './page-body.module.scss'
import {CSSProperties, forwardRef, useState} from "react";
import {AnimatePresence, useMotionValueEvent, useScroll} from "framer-motion";
import {IContentBodyProps} from "@/core/types";
import useWindowSize from "@/core/hooks/UseWindowSize";
import {CONTENT_MAX_WIDTH, FIXED_WRP_MARGIN} from "@/core/constants";
import {motion} from "framer-motion";
import {useRouter} from "next/router";

const Content = forwardRef<HTMLDivElement, IContentBodyProps>(({height, fixedWrpHeight,children, animate}, ref) => {
	const router = useRouter()
	const [scrollYState, setScrollYState] = useState<number>(0)
	const {width} = useWindowSize()
	const { scrollY, scrollYProgress } = useScroll()
	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrollYState(latest)
	})
	const setWidth = () => {
		const contentStyle: CSSProperties = {};
		if (height === 'full') {
			contentStyle['minHeight'] = `calc(130vh - ${fixedWrpHeight}px)`
		}

		if (!animate) {
			contentStyle['margin'] = `${FIXED_WRP_MARGIN}px auto`
		}
		if (animate && width) {

			if (width >= CONTENT_MAX_WIDTH+scrollYState && width <= 1920) {
				contentStyle['maxWidth'] = `${((CONTENT_MAX_WIDTH+scrollYState)/width)*100}%`
			}
			else if (width > 1920 && scrollYProgress.get() < 0.2) {
				contentStyle['transition'] = 'max-width 0.5s'
			}
			else if (width > 1920 && scrollYProgress.get() > 0.2) {
				contentStyle['maxWidth'] = `100%`
				contentStyle['transition'] = 'max-width 0.5s'
			}
			else if (width <= CONTENT_MAX_WIDTH+50 ) {
				const maxWidth = ((width+scrollYState/5 - 20)/width)*100
				contentStyle['maxWidth'] = `${maxWidth < 100?maxWidth: 100}%`
			}
			else {
				contentStyle['maxWidth'] = `100%`
			}
		}

		return contentStyle
	}

	const variants = {
		in: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				opacity: { duration: 0.4, delay: 0.1 },
				y: { duration: 0.5 },
				scale: {duration: 0}
			}
		},
		out: {
			opacity: 0,
			y: 120,
			scale: 1.08,
			transition: {
				duration: 0.2
			}
		}
	};


	return (
		<>
			<div ref={ref} className={styles.pageBody__mark}></div>
			<AnimatePresence initial={false} mode={'popLayout'}>
				<motion.div
					className={styles.pageBody}
					style={setWidth()}
					key={router.asPath}
					variants={variants}
					animate="in"
					initial="out"
					exit="out"
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</>
	);
});
export default Content;