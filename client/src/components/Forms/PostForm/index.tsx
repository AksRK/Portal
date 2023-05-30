import {CSSProperties, FC, useCallback, useEffect, useState} from 'react';
import {IImageData, IPostData, IPostForm, IPostFormData} from "@/core/types";
import {useForm} from "react-hook-form";
import Button from "@/components/UI/Button";
import FlexBox from "@/components/UI/FlexBox";
import {Autocomplete, debounce, MenuItem, Select, TextField} from "@mui/material";
import Editor from "@/components/Editor";
import InputImage from "@/components/InputImage";
import {Alert} from "@/core/utils/alert.utils";


const PostForm:FC<IPostForm> = ({categories, readAlsoPosts, creators, onSubmit, defaultPostValues}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [image, setImage] = useState<IImageData | null>(defaultPostValues?defaultPostValues.mainImg:null)
	const inputStyles: CSSProperties = {width: '100%'}

	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IPostFormData>({
		defaultValues: defaultPostValues ? {
			title: defaultPostValues.title,
			description: defaultPostValues.description,
			category: defaultPostValues.category._id,
			creator: defaultPostValues.creator?._id && defaultPostValues.creator?._id || null,
			readAlso: defaultPostValues.readAlso,
			content: defaultPostValues.content,
			viewsCount: defaultPostValues.viewsCount
		} : undefined,
	});

	useEffect(() => {
		if (image) {
			setValue('mainImg', image._id)
		}else {
			setValue('mainImg', '')
		}
	}, [image])

	const debouncedSetContentValue = useCallback(
		debounce((newValue) => {
			setValue('content', newValue);
		}, 500),
		[]
	);

	const handleSelectReadAlsoPost = (posts: IPostData[]) => {
		if (defaultPostValues && posts.some((post) => post._id === defaultPostValues._id)) {
			return Alert({msg: 'Нельзя добавить пост в данную выборку', type:'error'})
		}
		setValue('readAlso', posts.map((post) => post._id));
	}

	const handleFormSubmit = async (data: IPostFormData) => {
		setIsLoading(true)
		try {
			await onSubmit(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	};

	return (
		<>
			<form onSubmit={!isLoading?handleSubmit(handleFormSubmit):()=>{}}>
				<FlexBox
					justifyContent={'center'}
					gap={20}>
					<InputImage imageData={image} setImageData={setImage}/>
					<Select
						style={inputStyles}
						onChange={(event) => setValue('category', event.target.value)}
						value={watch('category') || ''}
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
						categories.find((category) => category._id === watch('category') && !category.editable)
							?
							<Autocomplete
								style={inputStyles}
								options={creators}
								getOptionLabel={(option) => `Имя:${option.fullName}, Никнейм ${option.nickName}`}
								value={creators.find((c) => c._id === watch('creator')) || null}
								onChange={(event, value) => {
									setValue('creator', value?._id || null);
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

					<TextField
						style={inputStyles}
						id="outlined-basic"
						label="Заголовок"
						variant="outlined"
						{...register("title", {required: true, maxLength: 80})}/>
					<TextField
						style={inputStyles}
						id="outlined-basic"
						label="Описание"
						variant="outlined"
						multiline
						rows={4}
						{...register("description", {required: true, maxLength: 80})}/>
					{
						defaultPostValues &&
                        <TextField
                            style={inputStyles}
                            type="number"
                            id="outlined-basic"
                            label="Кол-во просмотров"
                            variant="outlined"
							{...register("viewsCount", {required: true, maxLength: 80})}/>
					}


					<Autocomplete
						multiple
						style={inputStyles}
						options={readAlsoPosts}
						getOptionLabel={(option) => option.title}
						value={watch('readAlso')?readAlsoPosts.filter((post) => watch('readAlso').includes(post._id)):[]}
						onChange={(event, value) => {
							handleSelectReadAlsoPost(value)
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Читайте также"
							/>
						)}
					/>
					<Editor
						initialContent={watch('content')}
						onChange={(data) => debouncedSetContentValue(data)}/>
					<FlexBox
						justifyContent={"center"}
						customStyles={{marginTop: '30px'}}>
						<Button disabled={isLoading}>
							Сохранить
						</Button>
					</FlexBox>
				</FlexBox>
			</form>
		</>
	)
};

export default PostForm;