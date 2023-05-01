import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BasicMenu from "@/components/Admin/BasicMenu";
import {FC, useEffect, useState} from "react";
import {Backdrop, Fade, Modal, TextField} from "@mui/material";
import ModalContent from "@/components/UI/ModalContent";
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {ICategoryTableProps} from "@/core/types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const CategoryTable:FC<ICategoryTableProps>= ({categories, onDelete, onUpdate, getOne}) => {
	const [modalState, setModalState] = useState<boolean>(false)
	const [editCategoryState, setEditCategoryState] = useState<boolean>(false)
	const [deleteCategoryState, setDeleteCategoryState] = useState<boolean>(false)
	const [activeCategoryId, setActiveCategoryId] = useState<string>('')
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: ' ',
		}
	});

	const toggleModalState = () => {
		setModalState(!modalState)
		if (modalState) {
			setDeleteCategoryState(false)
			setEditCategoryState(false)
			setActiveCategoryId(' ')
		}
	}
	const editCategoryModal = (id: string) => {
		setEditCategoryState(true)
		setActiveCategoryId(id)
		toggleModalState()
	}

	const deleteCategoryModal = (id: string) => {
		setDeleteCategoryState(true)
		setActiveCategoryId(id)
		toggleModalState()
	}

	const confirmDelete = () => {
		onDelete(activeCategoryId)
		toggleModalState()
	}

	const confirmUpdate = (data: any) => {
		onUpdate(activeCategoryId, {...data})
		toggleModalState()
	}

	useEffect(()=> {
		if (editCategoryState) {
			const getCategory = async () => {
				const response = await getOne(activeCategoryId);
				if (response && response.data) {
					console.log(response.data.title)
					setValue("title", response.data.title);
				}

			}
			getCategory();
		}
	}, [editCategoryState])

	return (
		<>
			<TableContainer sx={{borderRadius:'20px'}}>
				<Table sx={{ minWidth: 700, borderRadius:'50px' }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Категория</StyledTableCell>
							<StyledTableCell align="center">Ссылка-сокращение</StyledTableCell>
							<StyledTableCell align="center">Всего постов</StyledTableCell>
							<StyledTableCell align="right">Действия</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							categories?.map((category) => (
								<StyledTableRow key={category._id}>
									<StyledTableCell component="th" scope="row">
										{category.title}
									</StyledTableCell>
									<StyledTableCell align="center">{category.titleUrl}</StyledTableCell>
									<StyledTableCell align="center">{category.posts.length}</StyledTableCell>
									<StyledTableCell align="right">
										<BasicMenu onEdit={()=> editCategoryModal(category._id)} onDelete={()=> deleteCategoryModal(category._id)}/>
									</StyledTableCell>
								</StyledTableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal
				open={modalState}
				onClose={toggleModalState}
				closeAfterTransition

				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={modalState}>
					<Box>
						<ModalContent>
							{
								editCategoryState
									?
									<>
										<form onSubmit={handleSubmit(confirmUpdate)}>
											<TextField id="outlined-basic" label="Название категории" variant="outlined" {...register("title", {required: true, maxLength: 80})}/>
											<input type="submit" value={'Сохранить'}/>
											<button onClick={toggleModalState}>
												Отмена
											</button>
										</form>
									</>
									:''
							}
							{
								deleteCategoryState
									?
									<>
										<h1>
											Вы действительно хотите удалить категорию? Все статьи связанные с этой категорией будут потеряны..
										</h1>
										<button onClick={confirmDelete}>
											Удалить
										</button>
										<button onClick={toggleModalState}>
											Отмена
										</button>
									</>
									:''
							}
						</ModalContent>
					</Box>
				</Fade>
			</Modal>
		</>

	);
}

export default CategoryTable