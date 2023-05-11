import {FC, useCallback, useEffect, useState} from "react";
import {
	CreatePostPageProps,
	ICreatorData,
	IImageData,
	IPostData,
	PostFormData,
} from "@/core/types";
import {useForm} from "react-hook-form";
import {Autocomplete, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import * as React from "react";
import {GetServerSidePropsContext} from "next";
import {API_URL} from "@/core/constants";
import InputImage from "@/components/InputImage";
import {Alert} from "@/core/utils/alert.utils";
import Editor from "@/components/Editor";
import {debounce} from "@mui/material";
import PostService from "@/services/post.service";


const CreatePostPage:FC<CreatePostPageProps> = ({categories,readAlsoPosts,creators}) => {
	const [currentCategory, setCurrentCategory] = useState<string>(categories[1]._id)
	const [image, setImage] = useState<IImageData | null>(null)
	const [editorState, setEditorState] = useState<string>('')
	const [selectedCreator, setSelectedCreator] = useState<ICreatorData | null>(null);
	const [selectedReadAlso, setSelectedReadAlso] = useState<IPostData[] | []>([]);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<PostFormData>();

	const handleChangeCategory = (event: SelectChangeEvent) => {
		setCurrentCategory(event.target.value as string);
	};
	const handleSelectCreator = (event: React.ChangeEvent<{}>, value: ICreatorData | null) => {
		if (value) {
			setSelectedCreator(value);
		} else {
			setSelectedCreator(null);
		}
	};
	const handleSelectReadAlsoPost = (event: React.ChangeEvent<{}>, value: IPostData[] | []) => {
		setSelectedReadAlso(value? value: [])
	};

	const debouncedSetValue = useCallback(
		debounce((newValue) => {
			setValue('content', newValue);
		}, 500),
		[]
	);

	const confirmUpdate = async (data: PostFormData) => {
		await PostService.create(data)
			.then((response)=> {
				Alert({msg: 'Пост успешно создан', type:'success'})
			})
			.catch((error) => {
				Alert({msg: error.response.data.message, type:'error'})
			})
	}

	useEffect(()=> {
		if(image) {
			setValue('mainImg', image._id)
		}
	},[image])

	useEffect(()=> {
		debouncedSetValue(editorState)
	}, [editorState])

	useEffect(() => {
		setValue('category', currentCategory)
		categories.find((category) => {
			if (category._id === currentCategory && category.editable) {
				setValue('creator', null)
				setSelectedCreator(null)
			}
		})
	}, [currentCategory])

	useEffect(() => {
		if (!selectedCreator) {
			setValue('creator', null)
		}else {
			setValue('creator', selectedCreator._id)
		}
	}, [selectedCreator])

	useEffect(() => {
		if (selectedReadAlso) {
			setValue('readAlso', selectedReadAlso.map((post) => post._id))
		}
	}, [selectedReadAlso])

	return (
		<div>
			<Grid
				container
				spacing={3}
				justifyContent="center"
				alignItems="center">

				<Grid item xs={10}>
					<Select
						style={{ width: '100%' }}
						value={currentCategory}
						onChange={handleChangeCategory}>
						{categories?.map((category) => (
							<MenuItem key={category._id} value={category._id}>
								{category.title}
							</MenuItem>
						))}
					</Select>
				</Grid>
				{
					categories.find((category) => category._id === currentCategory && !category.editable)
						?
						<Grid item xs={10}>
							<Autocomplete
								options={creators}
								getOptionLabel={(option) => option.fullName}
								noOptionsText={'Здесь пока пусто..'}
								isOptionEqualToValue={(option, value) => option._id === value._id}
								onReset={()=> setSelectedCreator(null)}
								onInputChange={(event, value) => handleSelectCreator(event, creators.find((c) => c.fullName === value) || null)}
								renderInput={(params) => (
									<TextField
										{...params}
										label={"Креатор"}
									/>
								)}
							/>
						</Grid>
						:
						''
				}
				<Grid item xs={5}>
					<InputImage imageData={image} setImageData={setImage}/>
				</Grid>
			</Grid>
			<form onSubmit={handleSubmit(confirmUpdate)}>
				<Grid
					container
					spacing={3}
					justifyContent="center"
					alignItems="center">
					<Grid item xs={10}>
						<TextField
							style={{ width: '100%' }}
							id="outlined-basic"
							label="Заголовок"
							variant="outlined"
							{...register("title", {required: true, maxLength: 80})}/>
					</Grid>
					<Grid item xs={10}>
						<TextField
							style={{ width: '100%' }}
							id="outlined-basic"
							label="Описание"
							variant="outlined"
							multiline
							rows={4}
							{...register("description", {required: true, maxLength: 80})}/>
					</Grid>
					<Grid item xs={10}>
						<Autocomplete
							multiple
							options={readAlsoPosts}
							getOptionLabel={(option) => option.title}
							isOptionEqualToValue={(option, value) => option._id === value._id}
							onChange={handleSelectReadAlsoPost}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Читайте также"
									placeholder="Выберите посты"
								/>
							)}
							noOptionsText="Нет результатов"
						/>
					</Grid>
					<Grid item xs={10}>
						<Editor initialContent={editorState} onChange={(data) => setEditorState(data)}/>
					</Grid>
					<Grid item xs={10}>
						<input type="submit" value={'Сохранить'}/>
					</Grid>
				</Grid>

			</form>
		</div>
	);
};

export default CreatePostPage;

export async function getServerSideProps(context:GetServerSidePropsContext) {
	const [categories, readAlsoPosts, creators] = await Promise.all([
		fetch(`${API_URL}/blog/category`).then(res => res.json()),
		fetch(`${API_URL}/posts/admin`).then(res => res.json()),
		fetch(`${API_URL}/creators/admin`).then(res => res.json()),
	])

	return {
		props: {categories: categories, readAlsoPosts: readAlsoPosts, creators: creators}
	}
}