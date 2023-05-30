import { ForwardedRef, forwardRef, useContext, useEffect, useRef, useState} from 'react';
import styles from './header.module.scss'
import Link from "next/link";
import {useRouter} from "next/router";
import {Context} from "@/components/StoreProvider";
import {observer} from "mobx-react-lite";
import useWindowSize from "@/core/hooks/UseWindowSize";
import Button from "@/components/UI/Button";

const Header = forwardRef<HTMLElement>((props, ref: ForwardedRef<HTMLElement>) => {
	const {store} = useContext(Context)
	const {width} = useWindowSize()
	const router = useRouter()
	const [burgerMenuState, setBurgerMenuState] = useState<boolean>(false)
	const [burgerButtonViewState, setBurgerButtonViewState] = useState<boolean>(false)

	const burgerButtonText = burgerMenuState ? 'Закрыть': 'Меню'
	const burgerViewBreakPoint = 950

	const headerWrpRef = useRef<HTMLDivElement>(null)
	const logoWrpRef = useRef<HTMLDivElement>(null)
	const headerLinksRef = useRef<HTMLDivElement>(null)

	const logout = () => {
		store.authStore.logout()
	}
	useEffect(() => {
		if (width && width <= burgerViewBreakPoint) {
			setBurgerButtonViewState(true)
		}else {
			setBurgerButtonViewState(false)
		}
	}, [width])

	const renderLinks = () => {
		if (router.asPath.includes('admin') && !router.asPath.includes('admin/signin')) {
			return (
				<>
					<button onClick={logout}>Выйти</button>
					<Link href={'/admin/panel/creators'}>Креаторы</Link>
					<Link href={'/admin/panel/posts'}>Посты</Link>
					<Link href={'/admin/panel/category'}>Категории </Link>
				</>
			)
		}
		if (!burgerButtonViewState) {
			return (
				<>
					<Link href={'/admin/signin'}>Войти </Link>
					<Link href={'/user-license-agreement'}>Пользовательское соглашение</Link>
				</>
			)
		}
		if (burgerButtonViewState) {
			return (
				<Button color={'white'} onClick={()=> setBurgerMenuState(!burgerMenuState)}>
					<div className={styles.header__burgerMenuBtn}>
						{burgerButtonText}
					</div>
				</Button>
			)
		}
	}

	return (
		<>
			<header
				ref={ref}
				className={`${styles.header} ${burgerMenuState? styles.header_z_index_10:''}`}>
				<div
					ref={headerWrpRef}
					className={styles.header__wrp}>
					<div
						ref={logoWrpRef}
						className={styles.header__logoWrp}>
						<div className={styles.header__logo}>
							<Link href={'/'}>BRAND NAME LINK</Link>
						</div>
						<div className={styles.header__description}>
							— тестовое описание проекта, проверка на вместительность и еще текст текст текст
						</div>
					</div>

					<div
						ref={headerLinksRef}
						className={styles.header__links}>

						{renderLinks()}
					</div>
				</div>
			</header>
		</>
	);
});

export default observer(Header);