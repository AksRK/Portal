import {ChangeEvent, FC, MouseEvent, useEffect, useState} from "react";
import { ICreatorData} from "@/core/types";
import CreatorsService from "@/services/creators.service";
import CreatorTable from "@/components/Admin/Tables/Creators";
import {Alert} from "@/core/utils/alert.utils";
import FlexBox from "@/components/UI/FlexBox";
import Button from "@/components/UI/Button";
import {TablePagination} from "@mui/material";


const CreatorsPage:FC = () => {
	const [creators, setCreators] = useState<ICreatorData[] | []>([])
	const [page, setPage] = useState<number>(0);
	const [totalDocs, setTotalDocs] = useState<number>(0)
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		getAllCreators()
	}, [page, rowsPerPage])
	const getAllCreators = async () => {
		await CreatorsService.getALl({page: page+1, limit: rowsPerPage})
			.then((response) => {
				if (response.data) {
					setCreators(response.data.docs)
					setTotalDocs(response.data.totalDocs)
				}
			}).catch((e) => {
				console.log(e)
			})
	}

	const removeCreator = async (id:string) => {
		await CreatorsService.remove(id)
			.then((response) => {
				getAllCreators()
				Alert({ msg: 'Креатор удален', type: 'info' });
			})
			.catch((error) => {
				Alert({ msg: error.response?.data?.message, type: 'error' });
			})
	}

	return (
		<div>
			<FlexBox justifyContent={'flex-start'}>
				<Button type={'next-link'} href={'creators/create'}>
					Добавить Креатора
				</Button>
				<FlexBox>
					<TablePagination
						component="div"
						count={totalDocs}
						page={page}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelDisplayedRows={({ from, to, count }) =>
							`Отображено ${from}-${to} из ${count}`
						}
						labelRowsPerPage="Строк на странице"
					/>
				</FlexBox>

				<CreatorTable creators={creators} onDelete={removeCreator}/>
			</FlexBox>
		</div>
	);
};

export default CreatorsPage;