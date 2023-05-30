import {FC} from 'react';
import styles from './load-more.module.scss';
import Button from "@/components/UI/Button";
import {ILoadMore} from "@/core/types";
const LoadMore:FC<ILoadMore> = ({loadMore,isLoading, onLoadMore, buttonText='Загрузить еще...'}) => {
	if (loadMore) {
		return (
			<div className={styles.loadMore}>
				<Button disabled={isLoading} onClick={onLoadMore}>
					{buttonText}
				</Button>
			</div>
		);
	}
	return <></>
};

export default LoadMore;