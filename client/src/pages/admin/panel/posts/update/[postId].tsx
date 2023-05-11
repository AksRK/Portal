import {FC, useCallback, useEffect, useState} from "react";
import {ICreatorData, IImageData, IPostData, PostFormData, UpdatePostPageProps} from "@/core/types";
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


const UpdatePostPage:FC<UpdatePostPageProps> = ({post, categories,readAlsoPosts,creators}) => {
	const [currentCategory, setCurrentCategory] = useState<string>(post.category._id)
	const [image, setImage] = useState<IImageData | null>(post.mainImg)
	const [editorState, setEditorState] = useState<string>(post.content)
	const [selectedCreator, setSelectedCreator] = useState(post.creator);
	const [selectedReadAlso, setSelectedReadAlso] = useState<IPostData[]>(post.readAlso);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<PostFormData>({
		defaultValues: {
			title: post.title,
			description: post.description,
			category: post.category._id,
			content: post.content,
			viewsCount: post.viewsCount
		}
	});

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
		if (value?.some((rdPost) => rdPost._id === post._id)) {
			Alert({msg: 'Нельзя добавить пост в данную выборку', type:'error'})
		}else {
			setSelectedReadAlso(value? value: [])
		}
	};

	const debouncedSetValue = useCallback(
		debounce((newValue) => {
			setValue('content', newValue);
		}, 500),
		[]
	);

	const confirmUpdate = async (data: PostFormData) => {
		await PostService.update(data, post._id)
			.then((response)=> {
				Alert({msg: 'Данные креатора успешно обновлены', type:'success'})
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
						onChange={handleChangeCategory}
						defaultValue={post.category._id}>
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
								value={selectedCreator || null}
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
						<TextField
							style={{ width: '100%' }}
							id="outlined-basic"
							label="Кол-во просмотров"
							variant="outlined"
							{...register("viewsCount", {required: true, maxLength: 80})}/>
					</Grid>
					<Grid item xs={10}>
						<Autocomplete
							multiple
							options={readAlsoPosts}
							getOptionLabel={(option) => option.title}
							isOptionEqualToValue={(option, value) => option._id === value._id}
							value={selectedReadAlso}
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

export default UpdatePostPage;

export async function getServerSideProps(context:GetServerSidePropsContext) {
	const [post, categories, readAlsoPosts, creators] = await Promise.all([
		fetch(`${API_URL}/posts/${context?.params?.postId}`).then(res => res.json()),
		fetch(`${API_URL}/blog/category`).then(res => res.json()),
		fetch(`${API_URL}/posts/admin`).then(res => res.json()),
		fetch(`${API_URL}/creators/admin`).then(res => res.json()),
	])

	return {
		props: {post: post, categories: categories, readAlsoPosts: readAlsoPosts, creators: creators}
	}
}