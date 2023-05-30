import {FC} from "react";
import {ICreatorFormData, IUpdateCreatorPageProps} from "@/core/types";
import * as React from "react";
import {GetServerSidePropsContext} from "next";
import CreatorsService from "@/services/creators.service";
import {Alert} from "@/core/utils/alert.utils";
import CreatorForm from "@/components/Forms/CreatorForm";


const UpdateCreatorPage:FC<IUpdateCreatorPageProps> = ({creator}) => {
	const confirmUpdate = async (data: ICreatorFormData) => {
		await CreatorsService.update(data, creator._id)
			.then((response)=> {
				Alert({msg: 'Данные креатора успешно обновлены', type:'success'})
			})
			.catch((error) => {
				Alert({msg: error.response.data.message, type:'error'})
			})
	}

	return (
		<CreatorForm
			onSubmit={confirmUpdate}
			defaultCreatorValues={creator}/>
	);
};

export default UpdateCreatorPage;

export async function getServerSideProps(context:GetServerSidePropsContext) {
	// const creator = await fetch(`${API_URL}/creators/${context?.params?.creatorId}`).then(res => res.json())
	try {
		const creator = await CreatorsService.getOne({id:context?.params?.creatorId as string, fromServer: true}).then((r) => r.data)
		return {
			props: {creator: creator}
		}
	}catch (err) {
		context.res.setHeader("Location", "/admin/panel/creators");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}
}