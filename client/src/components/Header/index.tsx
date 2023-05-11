import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import React, {FC, useContext, useRef} from 'react';
import styles from './header.module.scss'
import Link from "next/link";
import {useRouter} from "next/router";
import {Context} from "@/components/StoreProvider";
import {observer} from "mobx-react-lite";


const Header:FC = () => {
	const {store} = useContext(Context)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const router = useRouter()
	const adminPanelLogin = '/admin/signin'
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		store.authStore.logout()
	}

	return (
		<header  className={styles.header}>
			<div style={{display:'flex', justifyContent:'space-between'}}>
				<div>
					<Link href={'/'}>Главная </Link>
				</div>
				{
					router.asPath.includes('admin') && !router.asPath.includes('admin/signin')
						?
						<div>
							{/*<Button*/}
							{/*	id="basic-button"*/}
							{/*	aria-controls={open ? 'basic-menu' : undefined}*/}
							{/*	aria-haspopup="true"*/}
							{/*	aria-expanded={open ? 'true' : undefined}*/}
							{/*	onClick={handleClick}*/}
							{/*>*/}
							{/*	Категории*/}
							{/*</Button>*/}
							{/*<Menu*/}
							{/*	id="basic-menu"*/}
							{/*	anchorEl={anchorEl}*/}
							{/*	open={open}*/}
							{/*	onClose={handleClose}*/}
							{/*	MenuListProps={{*/}
							{/*		'aria-labelledby': 'basic-button',*/}
							{/*	}}*/}
							{/*>*/}
							{/*	<MenuItem onClick={()=> router.push('users')}>Profile</MenuItem>*/}
							{/*	<MenuItem onClick={handleClose}>My account</MenuItem>*/}
							{/*	<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
							{/*</Menu>*/}
							<button onClick={logout}>Выйти</button>
							<Link href={'/admin/panel/creators'}>Креаторы</Link>
							<Link href={'/admin/panel/posts'}>Посты</Link>
							<Link href={'/admin/panel/category'}>Категории </Link>
						</div>
						:
						<div>
							<Link href={'/admin/signin'}>Войти </Link>
							<Link href={'/user-license-agreement'}>Пользовательское соглашение</Link>
						</div>
				}
			</div>
		</header>
	);
};

export default observer(Header);