import CategoryTable from "@/components/Admin/Tables/Categories";
import {useEffect, useState} from "react";
import BlogCategoryService from "@/services/blog-category.service";
import {TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import {Alert} from "@/core/utils/alert.utils";
import {ICategoryBlogData, ICategoryFormData} from "@/core/types";
import Button from "@/components/UI/Button";
import FlexBox from "@/components/UI/FlexBox";

const Category = () => {
	const [categories, setCategories] = useState<ICategoryBlogData[]>([])
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICategoryFormData>();
	const getAllCategories = async () => {
		await BlogCategoryService.getALl({})
			.then((response) => {
				setCategories(response.data)
			}).catch((error) => {
				console.log(error)
			})
	}

	const addNewCategory = async (data:ICategoryFormData) => {
		await BlogCategoryService.create(data)
			.then((response) => {
				getAllCategories()
				Alert({ msg: `Категория ${response.data.title} создана`, type: 'success' });
		})
			.catch((error) => {
				Alert({ msg: error.response?.data?.message, type: 'error' });
		})

	}

	 const removeCategory = async (id:string) => {
		await BlogCategoryService.remove(id)
			.then((response) => {
				getAllCategories()
				Alert({ msg: 'Категория удалена', type: 'info' });
			})
			.catch((error) => {
				Alert({ msg: error.response?.data?.message, type: 'error' });
			})
	}

	 const updateCategory = async (id:string, title:string) => {
		await BlogCategoryService.update(id, title)
			.then((response) => {
				getAllCategories()
				Alert({ msg: 'Категория изменена', type: 'success' });
			})
			.catch((error) => {
				Alert({ msg: error.response?.data?.message, type: 'error' });
			})
	}

	 const getOneById = async (id:string) => {
		return BlogCategoryService.getOne({id: id})
			.then((response) => {
				return {data: response.data};
			})
			.catch((error) => {
				return {data: null};
			})
	}

	useEffect(()=> {
		getAllCategories()
	}, [])

	return (
		<>
			<FlexBox justifyContent={"flex-start"}>
				<form onSubmit={handleSubmit(addNewCategory)}>
					<FlexBox justifyContent={"flex-start"} alignItems={"center"}>
						<TextField
							style={{ width: '100%' }}
							id="outlined-basic"
							placeholder={'Название категории'}
							label="Добавить новую категорию"
							variant="outlined"
							{...register("title", {required: true, maxLength: 80})}/>
						<Button>
							Добавить категорию
						</Button>
					</FlexBox>
				</form>
				<CategoryTable categories={categories} onDelete={removeCategory} onUpdate={updateCategory} getOne={getOneById}/>
			</FlexBox>
		</>
	);
};

export default Category;