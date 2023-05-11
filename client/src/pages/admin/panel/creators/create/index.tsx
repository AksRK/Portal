import {FC, useEffect, useState} from "react";
import {CreatorFormData, IImageData} from "@/core/types";
import {useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import * as React from "react";
import InputImage from "@/components/InputImage";
import CreatorsService from "@/services/creators.service";
import {Alert} from "@/core/utils/alert.utils";

const CreateCreatorPage:FC = () => {
	const [image, setImage] = useState<IImageData | null>(null)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<CreatorFormData>({
		defaultValues: {
			fullName: '',
			nickName: '',
			description: '',
			fieldOfActivity: '',
			about: ''
		}
	});

	const confirmCreate = async (data: CreatorFormData) => {
		await CreatorsService.create(data)
			.then((response)=> {
				Alert({msg: 'Данные креатора успешно обновлены', type:'success'})
			})
			.catch((error) => {
				Alert({msg: error.response.data.message, type:'error'})
			})
	}

	useEffect(()=>{
		if(image) {
			setValue('photo', image._id)
		}
	},[image])

	return (
		<div>
			<form onSubmit={handleSubmit(confirmCreate)}>
				<InputImage imageData={image} setImageData={setImage}/>
				<TextField
					id="outlined-basic"
					label="Имя креатора"
					variant="outlined"
					{...register("fullName", {required: true, maxLength: 80})}/>
				<TextField
					id="outlined-basic"
					label="НикНейм"
					variant="outlined"
					{...register("nickName", {required: true, maxLength: 80})}/>
				<TextField
					id="outlined-basic"
					label="Описание"
					variant="outlined"
					{...register("description", {required: true, maxLength: 80})}/>
				<TextField
					id="outlined-basic"
					label="Направление деятельности"
					variant="outlined"
					{...register("fieldOfActivity", {required: true, maxLength: 80})}/>
				<TextField
					id="outlined-basic"
					label="Справка"
					variant="outlined"
					{...register("about", {required: true, maxLength: 80})}/>
				<input type="submit" value={'Сохранить'}/>
			</form>
		</div>
	);
};

export default CreateCreatorPage;