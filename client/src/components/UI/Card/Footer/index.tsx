import {FC} from 'react';
import {ICardFooter} from "@/core/types";
import styles from './card-footer.module.scss'
import arrow from "@/public/images/arrow.png";
import Image from "next/image";

const CardFooter:FC<ICardFooter> = ({children, hovered}) => {
	return (
		<div className={`${styles.cardFooter} ${hovered?styles.cardFooter_visible:''}`}>
			{children} <Image src={arrow} alt={'arrow'} width={13} height={13}/>
		</div>
	);
};

export default CardFooter;