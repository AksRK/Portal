import {FC} from 'react';
import styles from './card-image.module.scss'
import Image from "next/image";
import {ICardImage} from "@/core/types";

const CardImage:FC<ICardImage> = ({imagePath, alt='image'}) => {
	const sizes = '(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 35vw';
	return (
		<div className={styles.cardImage}>
			<Image src={imagePath} alt={alt} fill={true} loading={'lazy'} sizes={sizes}/>
		</div>
	);
};

export default CardImage;