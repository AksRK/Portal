import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {FC} from "react";
import {BasicMenuProps} from "@/core/types";

const BasicMenu: FC<BasicMenuProps> = ({ onEdit, onDelete }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		handleClose();
		onEdit();
	};

	const handleDelete = () => {
		handleClose();
		onDelete();
	};

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<SettingsIcon/>
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleEdit}>
					<EditIcon sx={{marginRight:'10px'}}/>
					Редактировать
				</MenuItem>
				<MenuItem onClick={handleDelete}>
					<DeleteIcon sx={{marginRight:'10px'}}/>
					Удалить
				</MenuItem>
			</Menu>
		</div>
	);
}

export default BasicMenu;