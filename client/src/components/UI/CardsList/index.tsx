import {FC} from 'react';
import styles from './cards-list.module.scss'
import {ICardsList} from "@/core/types";
import PostCard from "@/components/Cards/PostCard";
import LoadMore from "@/components/UI/LoadMore";
import CreatorCard from "@/components/Cards/CreatorCard";

const CardsList:FC<ICardsList> = (
	{
		data,
		withTag ,
		loadMore,
		onLoadMore,
		isLoading}) => {
	return (
		<>
			<div className={styles.cardsList}>
				{
					data?.posts?.map((post) => <PostCard key={post._id} post={post} withTag={withTag}/>)
				}
				{
					data?.creators?.map((creator) => <CreatorCard key={creator._id} creator={creator}/>)
				}
			</div>
			<LoadMore loadMore={loadMore} isLoading={isLoading} onLoadMore={onLoadMore}/>
		</>
	);
};

export default CardsList;