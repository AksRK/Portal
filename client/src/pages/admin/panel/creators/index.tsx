import {FC, useEffect, useState} from "react";
import { ICreatorData} from "@/core/types";
import CreatorsService from "@/services/creators.service";
import CreatorTable from "@/components/Admin/Tables/Creators";
import {Alert} from "@/core/utils/alert.utils";
import Link from "next/link";


const CreatorsPage:FC = () => {
	const [creators, setCreators] = useState<ICreatorData[] | []>([])

	useEffect(() => {
		getAllCreators()
	}, [])
	const getAllCreators = async () => {
		await CreatorsService.getALl()
			.then((response) => {
				if (response.data) {
					setCreators(response.data)
				}
			}).catch((e) => {
				console.log(e)
			})
	}

	const removeCreator = async (id:string) => {
		await CreatorsService.remove(id)
			.then((response) => {
				getAllCreators()
				Alert({ msg: 'Креатор удалена', type: 'info' });
			})
			.catch((error) => {
				Alert({ msg: error.response?.data?.message, type: 'error' });
			})
	}

	return (
		<div>
			<Link href={'creators/create'}>СОЗДАТЬ</Link>
			<CreatorTable creators={creators} onDelete={removeCreator}/>
		</div>
	);
};

export default CreatorsPage;