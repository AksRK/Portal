import CategoryTable from "@/components/Admin/Tables/Categories";
import {useEffect, useState} from "react";
import BlogCategoryService from "@/services/blog-category.service";
import {TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import {Alert} from "@/core/utils/alert.utils";
import {ICategoryBlogData, CategoryFormData} from "@/core/types";

const Category = () => {
	const [categories, setCategories] = useState<ICategoryBlogData[]>([])
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CategoryFormData>();
	const getAllCategories = async () => {
		await BlogCategoryService.getALl()
			.then((response) => {
				setCategories(response.data)
			}).catch((error) => {
				console.log(error)
			})
	}

	const addNewCategory = async (data:CategoryFormData) => {
		await BlogCategoryService.addNew(data)
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
		return BlogCategoryService.getOneById(id)
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
		<div style={{padding:'20px'}}>
			<form onSubmit={handleSubmit(addNewCategory)}>
				<TextField id="outlined-basic" label="Название категории" variant="outlined" {...register("title", {required: true, maxLength: 80})}/>
				<input type="submit" value={'Отправить'}/>
			</form>
			<CategoryTable categories={categories} onDelete={removeCategory} onUpdate={updateCategory} getOne={getOneById}/>
		</div>
	);
};

export default Category;