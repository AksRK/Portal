import {FC, useState} from 'react';
import CardBody from "@/components/UI/Card/Body";
import styles from './creator-card.module.scss'
import CardImage from "@/components/UI/Card/Image";
import CardTitle from "@/components/UI/Card/Title";
import { ICreatorCard } from "@/core/types";
import {useRouter} from "next/router";
import CardContent from "@/components/UI/Card/Content";
import CardDescription from "@/components/UI/Card/Description";
import CardFooter from "@/components/UI/Card/Footer";
import CardLink from "@/components/UI/Card/Link";

const CreatorCard:FC<ICreatorCard> = ({creator}) => {
	const [hoverCard, setHoverCard] = useState<boolean>(false)
	const router = useRouter()
	const imagePath = '/api/'+creator.photo.compressedImgPath

	return (
		<CardBody hoverState={hoverCard} setHoverState={setHoverCard}>
			<div className={styles.creatorCard}>
				<div className={styles.creatorCard__imgWrp}>
					<CardImage imagePath={imagePath} alt={creator.fullName}/>
				</div>
				<CardLink href={`/${router.query.category}/${creator.nickName}/`}>
					<CardContent footer={
						<CardFooter hovered={hoverCard}>
							Смотреть статьи
						</CardFooter>
					}>
						<CardTitle>
							{creator.fullName}
						</CardTitle>
						<CardDescription lineClamp={2}>
							{creator.description}
						</CardDescription>
					</CardContent>
				</CardLink>
			</div>
		</CardBody>
	);
};

export default CreatorCard;