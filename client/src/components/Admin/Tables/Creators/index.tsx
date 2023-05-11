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
import {ICreatorsTableProps} from "@/core/types";
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

const CreatorTable:FC<ICreatorsTableProps>= ({creators, onDelete}) => {
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
		router.push('creators/update/'+id)
	}

	return (
		<>
			<TableContainer sx={{borderRadius:'20px'}}>
				<Table sx={{ minWidth: 700, borderRadius:'50px' }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Креатор</StyledTableCell>
							<StyledTableCell align="center">Никнейм</StyledTableCell>
							<StyledTableCell align="center">Всего постов</StyledTableCell>
							<StyledTableCell align="right">Действия</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							creators?.map((creator) => (
								<StyledTableRow key={creator._id}>
									<StyledTableCell component="th" scope="row">
										{creator.fullName}
									</StyledTableCell>
									<StyledTableCell align="center">{creator.nickName}</StyledTableCell>
									<StyledTableCell align="center">{creator.posts.length}</StyledTableCell>
									<StyledTableCell align="right">
										<BasicMenu onEdit={()=> pushToUpdate(creator._id)} onDelete={()=> deleteCategoryModal(creator._id)}/>
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
											Вы действительно хотите удалить креатора? Все статьи связанные с этим креатором будут потеряны..
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

export default CreatorTable