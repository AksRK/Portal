import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BasicMenu from "@/components/Admin/BasicMenu";
import {FC, useState} from "react";
import {Backdrop, Fade, Modal} from "@mui/material";
import ModalContent from "@/components/UI/ModalContent";
import Box from "@mui/material/Box";
import {IPostsTableProps} from "@/core/types";
import {useRouter} from "next/router";

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

const PostsTable:FC<IPostsTableProps>= ({posts, onDelete}) => {
	const router = useRouter()
	const [modalState, setModalState] = useState<boolean>(false)
	const [deleteState, setDeleteState] = useState<boolean>(false)
	const [activeId, setActiveId] = useState<string>('')

	const toggleModalState = () => {
		setModalState(!modalState)
		if (modalState) {
			setDeleteState(false)
			setActiveId(' ')
		}
	}

	const deleteCategoryModal = (id: string) => {
		setDeleteState(true)
		setActiveId(id)
		toggleModalState()
	}

	const confirmDelete = () => {
		onDelete(activeId)
		toggleModalState()
	}

	const pushToUpdate = (id: string) => {
		router.push('posts/update/'+id)
	}

	return (
		<>
			<TableContainer sx={{borderRadius:'20px'}}>
				<Table sx={{ minWidth: 700, borderRadius:'50px' }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Категория</StyledTableCell>
							<StyledTableCell>Заголовок</StyledTableCell>
							<StyledTableCell align="center">Ссылка</StyledTableCell>
							<StyledTableCell align="center">Просмотров</StyledTableCell>
							<StyledTableCell align="right">Действия</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							posts?.map((post) => (
								<StyledTableRow key={post._id}>
									<StyledTableCell component="th" scope="row">
										{post.category.title}
									</StyledTableCell>
									<StyledTableCell align="center">{post.title}</StyledTableCell>
									<StyledTableCell align="center">
										<a href={`/${post.category.titleUrl}/posts/${post.titleUrl}`} target="_blank" rel="noreferrer">
											Тык
										</a>
									</StyledTableCell>
									<StyledTableCell align="center">{post.viewsCount}</StyledTableCell>
									<StyledTableCell align="right">
										<BasicMenu onEdit={()=> pushToUpdate(post._id)} onDelete={()=> deleteCategoryModal(post._id)}/>
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
								deleteState
									?
									<>
										<h1>
											Вы действительно хотите удалить пост?
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

export default PostsTable