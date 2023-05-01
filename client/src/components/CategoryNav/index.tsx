import styles from './category-nav.module.scss'
import {FC, Fragment} from "react";
import NavLink from "@/components/UI/NavLink";
import React from 'react';
import {CategoryNavProps} from "@/core/types";

const CategoryNav:FC<CategoryNavProps> = ({categories}) => {

	return (
		<div className={styles.categoryNavWrp}>
			<div className={styles.categoryNav}>
				{
					categories?.map((cat)=> {
						if (!cat.editable) {
							return (
								<React.Fragment key={'react-fragment-categories-key'}>
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
								</React.Fragment>
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

	);
};

export default CategoryNav;