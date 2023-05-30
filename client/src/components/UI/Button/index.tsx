import {FC} from 'react';
import styles from './button.module.scss'
import Link from "next/link";
import {IButton} from "@/core/types";
const Button:FC<IButton> = (
	{
		children,
		disabled= false,
		color= 'black',
		type='button',
		variant='default',
		href = '/',
		onClick
	}) => {

	const getStyle = () => {
		let result = `${styles.button} `
		if (variant === 'circle') {
			result += ` ${styles.button_circle}`
		}
		if (disabled) {
			result += ` ${styles.button_disabled}`
		}

		if (color === 'black') {
			result += ` ${styles.button_black}`
		}else if (color === 'white') {
			result += ` ${styles.button_white}`
		}

		return result
	}

	switch (type) {
		case 'button':
			return (
				<button className={getStyle()} disabled={disabled} onClick={!disabled ? onClick : undefined}>
					{children}
				</button>

			)
		case 'next-link':
			return (
				<Link href={href} className={getStyle()}>
					{children}
				</Link>

			)
		case 'link':
			return (
				<a href={href} className={getStyle()} target="_blank" rel="noreferrer">
					{children}
				</a>
			)
		default:
			return (
				<button className={getStyle()} disabled={disabled} onClick={onClick}>
					{children}
				</button>

			)
	}

};

export default Button;