import {CSSProperties, FC, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ICreatorFormData, IImageData, ICreatorForm} from "@/core/types";
import FlexBox from "@/components/UI/FlexBox";
import InputImage from "@/components/InputImage";
import {TextField} from "@mui/material";
import * as React from "react";
import Button from "@/components/UI/Button";

const CreatorForm:FC<ICreatorForm> = ({defaultCreatorValues, onSubmit}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [image, setImage] = useState<IImageData | null>(defaultCreatorValues?defaultCreatorValues.photo:null)
	const inputStyles: CSSProperties = {width: '100%'}

	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ICreatorFormData>({
		defaultValues: defaultCreatorValues ? {
			fullName: defaultCreatorValues.fullName,
			nickName: defaultCreatorValues.nickName,
			description: defaultCreatorValues.description,
			fieldOfActivity: defaultCreatorValues.fieldOfActivity,
			about: defaultCreatorValues.about
		} : undefined,
	});

	useEffect(() => {
		if (image) {
			setValue('photo', image._id)
		}else {
			setValue('photo', '')
		}
	}, [image])

	const handleFormSubmit = async (data: ICreatorFormData) => {
		setIsLoading(true)
		try {
			await onSubmit(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	};


	return (
		<form onSubmit={!isLoading?handleSubmit(handleFormSubmit):()=>{}}>
			<FlexBox
				justifyContent={'center'}
				gap={20}>
				<InputImage imageData={image} setImageData={setImage}/>
				<TextField
					style={inputStyles}
					id="outlined-basic"
					label="Имя креатора"
					variant="outlined"
					{...register("fullName", {required: true, maxLength: 80})}/>
				<TextField
					style={inputStyles}
					id="outlined-basic"
					label="НикНейм"
					variant="outlined"
					{...register("nickName", {required: true, maxLength: 80})}/>
				<TextField
					style={inputStyles}
					id="outlined-basic"
					label="Описание"
					variant="outlined"
					multiline
					rows={4}
					{...register("description", {required: true, maxLength: 80})}/>
				<TextField
					style={inputStyles}
					id="outlined-basic"
					label="Направление деятельности"
					multiline
					rows={2}
					variant="outlined"
					{...register("fieldOfActivity", {required: true, maxLength: 80})}/>
				<TextField
					style={inputStyles}
					id="outlined-basic"
					label="Справка"
					multiline
					rows={2}
					variant="outlined"
					{...register("about", {required: true, maxLength: 80})}/>
				<FlexBox
					justifyContent={"center"}
					customStyles={{marginTop: '30px'}}>
					<Button disabled={isLoading}>
						Сохранить
					</Button>
				</FlexBox>
			</FlexBox>
		</form>
	);
};

export default CreatorForm;