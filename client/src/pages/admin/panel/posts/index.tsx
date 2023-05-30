import {MouseEvent, ChangeEvent, FC, useEffect, useState} from 'react';
import {IAdminPostsProps, IPostData} from "@/core/types";
import PostService from "@/services/post.service";
import PostsTable from "@/components/Admin/Tables/Posts";
import {Alert} from "@/core/utils/alert.utils";
import FlexBox from "@/components/UI/FlexBox";
import Button from "@/components/UI/Button";
import {Autocomplete, MenuItem, Select, TablePagination, TextField} from "@mui/material";
import {GetServerSidePropsContext} from "next";
import BlogCategoryService from "@/services/blog-category.service";
import CreatorsService from "@/services/creators.service";



const AdminPosts:FC<IAdminPostsProps> = ({categories, creators}) => {
	const [posts, setPosts] = useState<IPostData[] | []>([])
	const [page, setPage] = useState<number>(0);
	const [totalDocs, setTotalDocs] = useState<number>(0)
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [category, setCategory] = useState<string>('')
	const [creator, setCreator] = useState<string>('')
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

	const handleResetFilter = () => {
		setPage(0)
		setCategory('')
		setCreator('')
		setRowsPerPage(10)
	}

	useEffect(() => {
		if (category && !categories.find((cat) => cat._id === category && !cat.editable)) {
			setCreator('')
		}
		getAllPost()
	}, [rowsPerPage, page, category, creator])

	const getAllPost = async () => {
		let params: { limit: number; page: number; categoryId?: string; creatorId?: string } = {
			limit: rowsPerPage,
			page: page+1
		}

		if (category) params.categoryId = category
		if (creator) params.creatorId = creator

		await PostService.getALl(params)
			.then((response) => {
				if (response.data) {
					setPosts(response.data.docs)
					setTotalDocs(response.data.totalDocs)
				}
			}).catch((e) => {
				console.log(e)
			})
	}

	const removePost = async (id:string) => {
		await PostService.remove(id)
			.then((response) => {
				getAllPost()
				Alert({ msg: 'Пост удален', type: 'info' });
			})
			.catch((error) => {
				Alert({ msg: error.response?.data?.message, type: 'error' });
			})
	}

	return (
		<>
			<FlexBox justifyContent={'flex-start'}>
				<FlexBox>
					<Button type={'next-link'} href={'posts/create'}>
						Добавить пост
					</Button>
				</FlexBox>
				<FlexBox alignItems={'center'} justifyContent={'flex-start'}>
					<Select
						onChange={(event) => setCategory(event.target.value)}
						value={category || ''}
						displayEmpty
					>
						<MenuItem value="" disabled>
							Выберите категорию
						</MenuItem>
						{categories?.map((category) => (
							<MenuItem key={category._id} value={category._id}>
								{category.title}
							</MenuItem>
						))}
					</Select>
					{
						categories.find((cat) => cat._id === category && !cat.editable)
							?
							<Autocomplete
								style={{width:'100%', minWidth:'400px', maxWidth:'600px'}}
								options={creators}
								getOptionLabel={(option) => `Имя:${option.fullName}, Никнейм ${option.nickName}`}
								value={creators.find((c) => c._id === creator) || null}
								onChange={(event, value) => {
									setCreator(value?._id || '')
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Креатор"
									/>
								)}
							/>
							:
							''
					}

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
					<FlexBox customStyles={{width: 'fit-content', height: 'fit-content'}}>
						<Button onClick={handleResetFilter}>
							Очистить
						</Button>
					</FlexBox>

				</FlexBox>

				<PostsTable posts={posts} onDelete={removePost}/>
			</FlexBox>
		</>
	);
};

export default AdminPosts;

export async function getServerSideProps(context:GetServerSidePropsContext) {
	try {
		const [categories, creators] = await Promise.all([
			BlogCategoryService.getALl({fromServer: true}).then((r) => r.data),
			CreatorsService.getAllForAdminList().then((r) => r.data)
		])

		return {
			props: {categories: categories, creators: creators}
		}
	}catch (err) {
		context.res.setHeader("Location", "/admin/panel/");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

}