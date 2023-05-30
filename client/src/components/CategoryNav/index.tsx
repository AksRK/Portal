import styles from './category-nav.module.scss'
import {FC, useRef, Fragment, useEffect, useState} from "react";
import NavLink from "@/components/UI/NavLink";
import {ICategoryNavProps} from "@/core/types";
import ObservedBlock from "@/components/UI/ObservedBlock";

const CategoryNav:FC<ICategoryNavProps> = ({categories}) => {
	const [isSticky, setIsSticky] = useState<boolean>(false)
	const categoryNavWrpRef = useRef<HTMLDivElement>(null)
	const markRef = useRef<HTMLDivElement>(null)
	const getStyle = () => {
		let style = `${styles.categoryNavWrp} `
		if (isSticky) {
			style += ` ${styles.categoryNavWrp_sticky}`
		}

		return style
	}

	useEffect(() => {
		const handleScroll = () => {
			if (markRef.current) {
				const componentTop = markRef.current.getBoundingClientRect().top;

				if (componentTop <= 0 && !isSticky) {
					setIsSticky(true)
				}else {
					setIsSticky(false)
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<ObservedBlock ref={markRef}/>
			{
				isSticky
					?
					<div style={{height: categoryNavWrpRef?.current?.clientHeight}}/>
					:
					''
			}
			<div ref={categoryNavWrpRef} className={getStyle()}>
				<div className={styles.categoryNav}>
					{
						categories?.map((cat)=> {
							if (!cat.editable) {
								return (
									<Fragment key={'react-fragment-categories-key'}>
										<NavLink
											key={cat._id}
											url={'/'+cat.titleUrl}
											className={styles.categoryNav__link}
											activeClassName={styles.categoryNav__link_active}>
											{cat.title}
										</NavLink>
										<div key={'category-separator'} className={styles.categoryNav__separator}/>
										<NavLink
											key={'rootCategory'}
											url={'/'}
											className={styles.categoryNav__link}
											activeClassName={styles.categoryNav__link_active}
											index={true}>
											Все статьи
										</NavLink>
									</Fragment>
								)
							}
							return (
								<NavLink
									key={cat._id}
									url={'/'+cat.titleUrl}
									className={styles.categoryNav__link}
									activeClassName={styles.categoryNav__link_active}>
									{cat.title}
								</NavLink>
							)
						})
					}
				</div>
			</div>
		</>

	);
};

export default CategoryNav;