import {FC} from "react";
import {ICreatorFormData} from "@/core/types";
import * as React from "react";
import CreatorsService from "@/services/creators.service";
import {Alert} from "@/core/utils/alert.utils";
import CreatorForm from "@/components/Forms/CreatorForm";

const CreateCreatorPage:FC = () => {
	const confirmCreate = async (data: ICreatorFormData) => {
		await CreatorsService.create(data)
			.then((response)=> {
				Alert({msg: 'Креатор добавлен', type:'success'})
			})
			.catch((error) => {
				Alert({msg: error.response.data.message, type:'error'})
			})
	}


	return (
		<CreatorForm onSubmit={confirmCreate}/>
	);
};

export default CreateCreatorPage;