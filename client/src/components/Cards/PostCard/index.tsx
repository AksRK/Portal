import {FC, useState} from 'react';
import CardBody from "@/components/UI/Card/Body";
import styles from './post-card.module.scss'
import CardImage from "@/components/UI/Card/Image";
import CardTitle from "@/components/UI/Card/Title";
import {IPostCard} from "@/core/types";
import Button from "@/components/UI/Button";
import CardFooter from "@/components/UI/Card/Footer";
import CardContent from "@/components/UI/Card/Content";
import CardDescription from "@/components/UI/Card/Description";
import CardLink from "@/components/UI/Card/Link";

const PostCard:FC<IPostCard> = ({post, withTag = true}) => {
	const [hoverCard, setHoverCard] = useState<boolean>(false)
	const imagePath = '/api/'+post?.mainImg?.compressedImgPath
	const categoryPath = post.category.titleUrl
	const postPath = () => {
		if (post.creator) {
			return `/${categoryPath}/${post.creator.nickName}/posts/${post.titleUrl}`
		}
		return `${categoryPath}/posts/${post.titleUrl}`
	}

	return (
		<CardBody setHoverState={setHoverCard} hoverState={hoverCard}>
			<div className={styles.postCard}>
				<div className={styles.postCard__imgWrp}>
					<CardImage imagePath={imagePath} alt={post.title}/>
					{
						withTag
							?
							<div className={styles.postCard__catWrp}>
								<Button type={'next-link'} href={categoryPath}>
									{post.category.title}
								</Button>
							</div>
							:
							null
					}

				</div>
				<CardLink href={postPath()}>
					<CardContent footer={
						<CardFooter hovered={hoverCard}>
							Читать
						</CardFooter>
					}>
						<CardTitle>
							{post.title}
						</CardTitle>
						<CardDescription lineClamp={4}>
							{post.description}
						</CardDescription>
					</CardContent>
				</CardLink>
			</div>
		</CardBody>
	);
};

export default PostCard;